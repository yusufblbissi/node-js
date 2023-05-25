import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`no document found for this id: ${id}`, 404));
    }

    //delete status
    res.status(204).send();
  });

export const updateOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiError(`no document found for this id: ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });
};
export const createOne = (Model) => {
  return asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });
};
export const getOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`no document found for this id: ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });
};
export const getAll = (Model,ModelName = '') => {
  return asyncHandler(async (req, res) => {
    console.log(req.params.keyword);
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentsCount = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .paginate(documentsCount)
      .filter()
      .search(ModelName)
      .limitFeilds()
      .sort();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;
    res.status(200).json({
      results: documents.length,
      paginationResult,
      data: documents,
    });
  });
};
