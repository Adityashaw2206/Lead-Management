import { Request, Response } from "express";
import Lead from "../models/lead.model";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middleware/auth.middleware";

export const createLead = asyncHandler(

  async (
    req: AuthRequest,
    res: Response
  ) => {

    const {
      name,
      email,
      status,
      source,
    } = req.body;


    // CHECK REQUIRED FIELDS

    if (!name || !email || !source) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    // CREATE LEAD

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: req.user._id,
    });


    // RESPONSE

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
    });
  }
);


export const getLeads = asyncHandler(

  async (
    req: Request,
    res: Response
  ) => {

    // QUERY PARAMS

    const {
      status,
      source,
      search,
      sort,
      page = "1",
    } = req.query;


    // FILTER OBJECT

    const query: any = {};


    // FILTER STATUS

    if (status) {
      query.status = status;
    }


    // FILTER SOURCE

    if (source) {
      query.source = source;
    }


    // SEARCH NAME OR EMAIL

    if (search) {

      query.$or = [

        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },

      ];
    }


    // PAGINATION

    const currentPage = Number(page);
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    // SORTING

    let sortOption = {};

    if (sort === "latest") {
      sortOption = { createdAt: -1 };
    }

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }


    // FETCH LEADS

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email");


    // TOTAL COUNT

    const total = await Lead.countDocuments(query);


    // RESPONSE

    res.status(200).json({

      success: true,

      pagination: {
        total,
        currentPage,
        totalPages: Math.ceil(total / limit),
      },

      leads,
    });
  }
);


export const getSingleLead = asyncHandler(

  async (
    req: Request,
    res: Response
  ) => {

    const lead = await Lead.findById(
      req.params.id
    );


    if (!lead) {

      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }


    res.status(200).json({
      success: true,
      lead,
    });
  }
);


export const updateLead = asyncHandler(

  async (
    req: Request,
    res: Response
  ) => {

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );


    if (!lead) {

      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead,
    });
  }
);


export const deleteLead = asyncHandler(

  async (
    req: Request,
    res: Response
  ) => {

    const lead = await Lead.findByIdAndDelete(
      req.params.id
    );


    if (!lead) {

      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  }
);