const { allFieldsResponse, already_ExistResponse, createResponse, serverError_Response, successResponse, notFound_Response, updateResponse, deleteResponse } = require("../utilts/response");
const ProductModel = require("../models/product.model");
const CategoryModel = require("../models/category.model");
const BrandModel = require("../models/brand.model");
const ColorModel = require("../models/color.model");
const { createUniqueName } = require("../utilts/helper");
const fs = require("fs");
const create = async (req, res) => {
    try {
        const thumbnail = req.files.thumbnail;
        const { name, slug, description, original_price, discount_percentage, final_price, category_id, color_ids, brand_id } = req.body;
        if (
            !name ||
            !slug ||
            !description ||
            !original_price ||
            !discount_percentage ||
            !final_price ||
            !category_id ||
            !brand_id ||
            !thumbnail
        ) {
            return allFieldsResponse(res);
        }


        const product = await ProductModel.findOne({ slug });
        if (product) return already_ExistResponse(res);
        const image = createUniqueName(thumbnail.name);
        const destination = "./public/images/product/main/" + image;
        thumbnail.mv(
            destination,
            async (err) => {
                if (err) {
                    return serverError_Response(res, "image not uplaod");
                } else {
                    await ProductModel.create({
                        name,
                        slug,
                        description,
                        original_price,
                        discount_percentage,
                        final_price,
                        category_id,
                        color_ids: JSON.parse(color_ids),
                        brand_id,
                        thumbnail: image
                    });

                    return createResponse(res);
                }

            })


    } catch (error) {
        console.log(error)
        return serverError_Response(res);
    }
}

const getData = async (req, res) => {
    try {
        const query = req.query;
        const object = {};
        const sortedBy = {};
        let limit = query.limit ? parseInt(query.limit) : 0;
        if (query.id) object["_id"] = query.id
        if (query.status) object["status"] = query.status == "true" ? true : false
        if (query.stock) object["stock"] = query.stock == "true" ? true : false
        if (query.is_best_seller) object["is_best_seller"] = query.is_best_seller == "true" ? true : false
        if (query.show_home) object["show_home"] = query.show_home == "true" ? true : false
        if (query.is_featured) object["is_featured"] = query.is_featured == "true" ? true : false
        if (query.is_hot) object["is_hot"] = query.is_hot == "true" ? true : false;

        if (query.category_slug) {
            const category = await CategoryModel.findOne({ slug: query.category_slug });
            object["category_id"] = category._id
        }
        if (query.brand_slug) {
            const brand = await BrandModel.findOne({ slug: query.brand_slug });
            object["brand_id"] = brand._id
        }
        if (query.color_slug) {
            const slugArray = query.color_slug.split(",");

            const colors = await ColorModel.find({
                slug: { $in: slugArray }
            });

            const colorIds = colors.map(color => color._id);

            object["color_ids"] = { $in: colorIds };
        }

        if (query.sort === "asc") {
            sortedBy["final_price"] = 1
        } else if (query.sort == "desc") {
            sortedBy["final_price"] = -1
        } else {
            sortedBy["createAt"] = -1

        }

        console.log(sortedBy)

        if (query.max_price && query.min_price) {
            object["final_price"] = {
                $gte: Number(query.min_price),
                $lte: Number(query.max_price),
            }
        }



        const product = await ProductModel.find(object)
            .sort(sortedBy)
            .limit(limit)
            .populate([
                {
                    path: "category_id",
                    select: "_id name slug"
                },
                {
                    path: "color_ids",
                    select: "_id name slug color_code"
                },
                {
                    path: "brand_id",
                    select: "_id name slug"
                }
            ]);
        return successResponse(res, "product found", { product, imageBaseUrl: "http://localhost:5000/images/product/" });
    } catch (error) {
        return serverError_Response(res);
    }
}

const add_images = async (req, res) => {
    try {
        const images = req.files.image;
        const id = req.params.id;
        const product = await ProductModel.findById({ _id: id });
        if (!product) return notFound_Response(res);
        const other_images = product.other_images;

        if (Array.isArray(images) == true) {
            await Promise.all(
                images.map(async (img) => {
                    const image_name = createUniqueName(img.name);
                    const destination = "./public/images/product/others/" + image_name;
                    await img.mv(destination);
                    other_images.push(image_name);
                }
                )
            )


        } else {
            const image_name = createUniqueName(images.name);
            const destination = "./public/images/product/others/" + image_name;
            await images.mv(destination);
            other_images.push(image_name);
        }

        product.other_images = other_images
        await product.save();
        return successResponse(res, "image add")

    } catch (error) {
        console.log(error)
        return serverError_Response(res);
    }
}



module.exports = {
    create, getData, add_images
}