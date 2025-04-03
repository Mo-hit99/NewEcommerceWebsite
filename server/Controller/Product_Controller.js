import { ProductSchema } from "../model/ProductModel.js";

// get all data
// export const getAllProductData = async (req, res) => {
//   try {
//     let queryData = await ProductSchema.find();
//     res.status(200).json({
//       queryData,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getAllProductData = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, sort, ...filters } = req.query;
    const query = {};
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }
    // Build filter query
    if (filters.category) query.category = filters.category;
    if (filters.color) query.color = { $in: filters.color.split(",") };
    if (filters.size) query.size = { $in: filters.size.split(",") };
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }

    // Sorting
    const sortOptions = {};
    if (sort) {
      const [field, order] = sort.split("_");
      sortOptions[field] = order === "asc" ? 1 : -1;
    }

    const queryData = await ProductSchema.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await ProductSchema.countDocuments(query);

    res.json({
      queryData,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get by Id
export const getProductDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await ProductSchema.findById({ _id: id });
    res.status(200).json(getById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create productData
export const createProductData = async (req, res) => {
  try {
    const {
      productName,
      brand,
      category,
      price,
      description,
      discount,
      sizes,
    } = req.body;
    const imageDataArray = req.files.map((file) => file.path);
    if (
      !imageDataArray ||
      !productName ||
      !brand ||
      !category ||
      !price ||
      !description ||
      !discount ||
      !sizes
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const productImg = new ProductSchema({
      productName,
      brand,
      price,
      discount,
      description,
      category,
      sizes,
      imageUrl: imageDataArray,
    });

    await productImg.save();
    res.status(201).send("file stored in data");
    console.log("file has been stored in database");
  } catch (error) {
    console.log("file has failed to stored in database");
    console.log(error);
    res.status(400).json({ message: "file has failed to stored in database" });
  }
};

// Delete ProductData by Id
export const DeleteProductData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProductData = await ProductSchema.findOneAndDelete({ _id: id });
    res.status(200).json(deleteProductData);
    console.log("product is Delete");
  } catch (error) {
    res.status(400).json({ message: "product is not Delete" });
    console.log(error);
  }
};

