export interface ICategory {
    _id?: string;
    label?: string;
    value?: string;
    createdAt?: string;
    updatedAt?: string;
    // __v: number;
  }
  
  export interface ITag {
    _id?: string;
    label?: string;
    value?: string;
    createdAt?: string;
    updatedAt?: string;
    // __v: number;
  }
  
  export interface IReview {
    rating?: number;
    comment?: string;
    _id?: string;
  }
  
  export interface IProduct {
    _id?: string;
    fileName?: string;
    fileType?: "mp4" | "zip" | "pdf" | "mp3" | "png" | "svg" | "jpeg";
    category?: ICategory;
    tags?: ITag;
    photo?: string;
    description?: string;
    reviews?: IReview[];
    version?: string;
    downloadCount?: number;
    stock?: number;
    licenseType?: "single" | "multiple" | "lifetime";
    createdAt?: string;
    updatedAt?: string;
    fileUrl?: string;
  }
  