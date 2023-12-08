const { StatusCodes } = require('http-status-codes');
const { fmt_res } = require('../formetter');
const { BaseController } = require('./base');



class CRUDController extends BaseController {

    constructor(model) {
        super();
        this.model = model;
    }

   
     async  find(res, query)  {
        try {
            const queryRes = await this.model.find(query);
            return res.status(StatusCodes.OK).json(fmt_res(queryRes));
        } catch (error) {
            this.errorHandler(res, error);
        }
    }

    async findById(req, id) {
        try{
            const queryRes = await this.model.findById(id);
            return res.status(StatusCodes.OK).json(fmt_res(queryRes))
        }catch (error) {
            this.errorHandler(res, error);
        }
    }
  

    async paginatedFind(res, pagination, query){
        try {
            const { perPage = 20, pageNo = 1 } = pagination;
            const queryRes = await this.model.find(query).skip((pageNo -1)*perPage.limit(perPage));
            return res.status(StatusCodes.OK).json(fmt_res(queryRes));
        }catch (error){
            this.errorHandler(res, error);
        }
    }


    async findOne( res, query){
        try {
            const queryRes = await this.model.findOne(query);
            return res.status(StatusCodes.OK).json(fmt_res(queryRes));
        }catch(error){
            this.errorHandler(res,this.error)
        }
    }

    async create(res, document){
        try {
            const createDoc = await this.model.create(document);
            return res.status(StatusCodes.CREATED).json(fmt_res(createDoc))
        }catch (error){
            this.errorHandler(res, error)
        }
    }

    async update(res, _id, document){
        try {
            const updatedDoc = await this.model.findByIdUpdate(id, document);
            return res.status(StatusCodes.OK).json(fmt_res(updatedDoc))
        }catch (error){

        }
    }

    async delete(res, id){
        try{
            const updatedDoc = await this.model.findByIdUpdate(id, {delete: true});
            return res.status(StatusCodes.OK).json(fmt_res(updatedDoc))
        }catch (error) {
            this.errorHandler(res, error)
        }
    }
}

module.exports = { CRUDController}