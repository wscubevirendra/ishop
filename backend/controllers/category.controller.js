const { allFieldsResponse, already_ExistResponse, createResponse, serverError_Response, successResponse, notFound_Response, updateResponse, deleteResponse } = require("../utilts/response");
const CategoryModel = require("../models/category.model");
const ProductModel = require("../models/product.model");
const { createUniqueName } = require("../utilts/helper");
const fs = require("fs");
const create = async (req, res) => {
    try {

        const category_image = req.files.category_image;
        const { name, slug } = req.body;
        if (!name || !slug || !category_image) return allFieldsResponse(res)
        const category = await CategoryModel.findOne({ slug });
        if (category) return already_ExistResponse(res);
        const image = createUniqueName(category_image.name);
        const destination = "./public/images/category/" + image;
        category_image.mv(
            destination,
            async (err) => {
                if (err) {
                    return serverError_Response(res, "image not uplaod");
                } else {
                    await CategoryModel.create({ name, slug, image });
                    return createResponse(res)
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
        let limit = query.limit ? parseInt(query.limit) : 0;
        if (query.id) object["_id"] = query.id
        if (query.status) object["status"] = query.status == "true" ? true : false
        if (query.is_home) object["is_home"] = query.is_home == "true" ? true : false
        if (query.is_best) object["is_best"] = query.is_best == "true" ? true : false
        if (query.is_top) object["is_top"] = query.is_top == "true" ? true : false;
        const category = await CategoryModel.find(object).sort({ createAt: -1 }).limit(limit);

        const categoryData = await Promise.all(
            category.map(async (cat) => {
                const count = await ProductModel.countDocuments({
                    category_id: cat._id
                });

                return {
                    ...cat.toJSON(),
                    count
                };
            })
        );




        return successResponse(res, "category found", { category: categoryData, imageBaseUrl: "http://localhost:5000/images/category/" });
    } catch (error) {
        return serverError_Response(res);
    }
}


const statusUpdate = async (req, res) => {
    try {
        const { field } = req.body;
        console.log(field)
        const id = req.params.id;
        const category = await CategoryModel.findById(id);
        if (!category) return notFound_Response(res);
        console.log(field, !category[field])
        const msg = `${field} Updated successfully`
        await CategoryModel.findByIdAndUpdate(id, {
            $set: {
                [field]: !category[field]
            }
        });

        return updateResponse(res, msg);

    } catch (error) {
        console.log(error)
        return serverError_Response(res);
    }

}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.findById(id);
        if (!category) return notFound_Response(res);
        await CategoryModel.findByIdAndDelete({ _id: id });
        await fs.unlinkSync(`./public/images/category/${category.image}`);
        return deleteResponse(res, "Category delete",)
    } catch (error) {
        console.log(TypeError)
        return serverError_Response(res);
    }
}

const update = async (req, res) => {
    try {
        const image = req.files?.image || null;
        const id = req.params.id;

        const category = await CategoryModel.findById(id);
        if (!category) return notFound_Response(res);

        const object = {};

        // name & slug update
        if (req.body.name) {
            object.name = req.body.name;
            object.slug = req.body.slug;
        }

        // image update
        if (image) {
            const category_image = createUniqueName(image.name);
            const destination = "./public/images/category/" + category_image;

            await image.mv(destination); // 🔥 wait till upload
            object.image = category_image;
        }

        await CategoryModel.updateOne(
            { _id: id },
            { $set: object }
        );

        return updateResponse(res, "Category updated successfully");

    } catch (error) {
        console.log(error);
        return serverError_Response(res);
    }
};




module.exports = {
    create, getData, update, statusUpdate, deleteById
}