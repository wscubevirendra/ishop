const { allFieldsResponse, already_ExistResponse, createResponse, serverError_Response, successResponse, notFound_Response, updateResponse, deleteResponse } = require("../utilts/response");
const ColorModel = require("../models/color.model");
const { createUniqueName } = require("../utilts/helper");
const fs = require("fs");
const create = async (req, res) => {
    try {
        const { name, slug, color_code } = req.body;
        if (!name || !slug || !color_code) return allFieldsResponse(res)
        const category = await ColorModel.findOne({ slug });
        if (category) return already_ExistResponse(res);

        await ColorModel.create({ name, slug, color_code });
        return createResponse(res)

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

        const colors = await ColorModel.find(object).sort({ createAt: -1 }).limit(limit);
        return successResponse(res, "category found", { colors });
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
        await CategoryModel.findByIdAndDelete(id);
        await fs.unlink(`./public/images/category/${category.image}`);
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