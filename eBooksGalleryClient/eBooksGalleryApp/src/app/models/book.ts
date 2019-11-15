export interface Book {
    id?:string;
    title:string;
    subtitle:string;
    author:string;
    description:string;
    price:number;
    quantity:number;
    language:string;
    coverImageUrl:string;
    createdDate:Date;
    updatedDate:Date;
    isFree:boolean;
    isAvailable:boolean;
    status:string;
    bookLocationPath:string;
}

