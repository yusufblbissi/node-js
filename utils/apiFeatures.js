export class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "sort", "limit", "feilds"];
    excludesFields.forEach((el) => delete queryStringObj[el]);

    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createAt");
    }
    return this;
  }

  limitFeilds() {
    if (this.queryString.feilds) {
      let feilds = this.queryString.feilds.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(feilds);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }
  search(modelName) {
    if (this.queryString.keyword) {
      const keyword = this.queryString.keyword;
      let query = {};

      if (modelName === "Product") {
        query = {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        };
      } else {
        query = { name: { $regex: keyword, $options: "i" } };
      }

      this.mongooseQuery = this.mongooseQuery.find(query);
    }

    return this;
  }
  paginate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    pagination.totalPages = Math.ceil(countDocuments / limit);

    pagination.limit = limit;
    pagination.currentPage = page;

    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}

// filter(){
// const { quantity } = req.query;
// let filter = {};
// if (quantity) {
//   filter.quantity = quantity;
// }
// let queryStr = JSON.stringify(filter);
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
// filter = JSON.parse(queryStr);
// }
