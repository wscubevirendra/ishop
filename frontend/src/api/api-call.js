import { cookies } from "next/headers";
import { axiosInstance } from "@/helper/helper";

const fetchCategory = (queryObject = {}) => {
    const query = new URLSearchParams();
    if (queryObject.id) query.append("id", queryObject.id);
    if (queryObject.status) query.append("status", queryObject.status);
    if (queryObject.is_top) query.append("is_top", queryObject.is_top);
    if (queryObject.limit) query.append("limit", queryObject.limit);

    return axiosInstance.get(`category?${query.toString()}`).then(
        (response) => {
            if (response.data.success) {
                return {
                    category: response.data.data.category
                    , imageBaseUrl: response.data.data.imageBaseUrl
                }

            } else {
                return null
            }
        }
    ).catch(
        (error) => {
            return null
        }
    )
}

const fetchBrand = (queryObject = {}) => {
    const query = new URLSearchParams();
    if (queryObject.id) {
        query.append("id", queryObject.id)
    }

    return axiosInstance.get(`brand?${query.toString()}`).then(
        (response) => {
            if (response.data.success) {
                return {
                    brand: response.data.data.brand
                    , imageBaseUrl: response.data.data.imageBaseUrl
                }

            } else {
                return null
            }
        }
    ).catch(
        (error) => {
            return null
        }
    )
}

const fetchColor = (queryObject = {}) => {
    const query = new URLSearchParams();
    if (queryObject.id) {
        query.append("id", queryObject.id)
    }

    return axiosInstance.get(`color?${query.toString()}`).then(
        (response) => {
            if (response.data.success) {
                return {
                    color: response.data.data.colors
                }

            } else {
                return null
            }
        }
    ).catch(
        (error) => {
            return null
        }
    )
}


const fetchProduct = (queryObject = {}) => {
    const query = new URLSearchParams();
    if (queryObject.id) query.append("id", queryObject.id);
    if (queryObject.category_slug) query.append("category_slug", queryObject.category_slug);
    if (queryObject.brand_slug) query.append("brand_slug", queryObject.brand_slug);
    if (queryObject.color_slug) query.append("color_slug", queryObject.color_slug);
    if (queryObject.sort) query.append("sort", queryObject.sort);
    if (queryObject.limit) query.append("limit", queryObject.limit);
    if (queryObject.min_price && queryObject.max_price) {
        query.append("min_price", queryObject.min_price);
        query.append("max_price", queryObject.max_price);
    }

    return axiosInstance.get(`product?${query.toString()}`).then(
        (response) => {
            if (response.data.success) {
                return {
                    product: response.data.data.product
                    , imageBaseUrl: response.data.data.imageBaseUrl
                }

            } else {
                return null
            }
        }
    ).catch(
        (error) => {
            return null
        }
    )
}


const getUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("user_token")?.value ?? null;
    return axiosInstance.get("user/me", {
        headers: {
            Authorization: token
        }
    }).then(
        (response) => {
            if (response.data.success) {
                return response.data.data
            } else {
                return null
            }
        }
    ).catch(
        (error) => {
            return null
        }
    )
}


export { fetchCategory, fetchBrand, fetchColor, fetchProduct, getUser }