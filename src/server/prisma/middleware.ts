import { type Prisma } from "@prisma/client";

export const softDeleteChangeFind: Prisma.Middleware = async (params, next) => {
  if (!params.args) {
    params.args = {};
  }

  if (params.action === "findUnique" || params.action === "findFirst") {
    // Change to findFirst - you cannot filter
    // by anything except ID / unique with findUnique
    params.action = "findFirst";

    // Add 'isDeleted' filter
    // ID filter maintained
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params.args.where) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (params.args.where.isDeleted === undefined) {
        // Exclude isDeleted records if they have not been explicitly requested
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        params.args.where["isDeleted"] = false;
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args["where"] = { isDeleted: false };
    }
  }

  if (params.action === "findMany") {
    // Find many queries
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params.args.where) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (params.args.where.isDeleted === undefined) {
        // Exclude isDeleted records if they have not been explicitly requested
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        params.args.where["isDeleted"] = false;
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args["where"] = { isDeleted: false };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await next(params);
};

export const softDeleteChangeUpdate: Prisma.Middleware = async (
  params,
  next
) => {
  if (!params.args) {
    params.args = {};
  }

  if (params.action === "update") {
    // Change to updateMany - you cannot filter
    // by anything except ID / unique with findUnique
    params.action = "updateMany";

    // Add 'isDeleted' filter
    // ID filter maintained
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params.args.where !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args.where["isDeleted"] = false;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args["where"] = { isDeleted: false };
    }
  }

  if (params.action === "updateMany") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params.args.where !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args.where["isDeleted"] = false;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args["where"] = { isDeleted: false };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await next(params);
};

export const softDeleteChangeDelete: Prisma.Middleware = async (
  params,
  next
) => {
  if (!params.args) {
    params.args = {};
  }

  if (params.action === "delete") {
    // Change to updateMany - you cannot filter
    // by anything except ID / unique with findUnique
    params.action = "updateMany";

    // Add 'isDeleted' filter
    // ID filter maintained
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params.args.where !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args.where["isDeleted"] = false;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args["where"] = { isDeleted: false };
    }

    // Set isDeleted to true
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params.args.data !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args.data["isDeleted"] = true;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args["data"] = { isDeleted: true };
    }
  }

  if (params.action === "deleteMany") {
    // Delete many queries
    params.action = "updateMany";

    // Add 'isDeleted' filter
    // ID filter maintained
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params.args.where !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args.where["isDeleted"] = false;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args["where"] = { isDeleted: false };
    }

    // Set isDeleted to true
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params.args.data !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args.data["isDeleted"] = true;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args["data"] = { isDeleted: true };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await next(params);
};

export const versioningChangeUpdate: Prisma.Middleware = async (
  params,
  next
) => {
  if (!params.args) {
    params.args = {};
  }

  if (params.action === "update") {
    // Increment version
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params.args.data !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args.data["version"] = { increment: 1 };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args["data"] = { version: { increment: 1 } };
    }
  }

  if (params.action === "updateMany") {
    // Increment version
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params.args.data !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args.data["version"] = { increment: 1 };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      params.args["data"] = { version: { increment: 1 } };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await next(params);
};
