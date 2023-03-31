class ApiFeatures {
    constructor(query,queryString){
        this.query = query
        this.queryString = queryString
    }

    search(){
        const keyword = this.queryString.keyword ? {name: {$regex: this.queryString.keyword,$options: 'i'},} : {}
        
        this.query = this.query.find({ ... keyword})
        return this
    }

    filter(){
        const queryCopy = {...this.queryString}
        
        /* Remove some fields for category */
        const removeFields = ["keyword","page","limit",]
        
        removeFields.forEach(key => delete queryCopy[key])
        /* Filter for price and rating */
        let queryString = JSON.stringify(queryCopy);
        const regex = /\b(gt|gte|lt|lte)\b/g;
        queryString = queryString.replace(regex,key =>`$${key}`);
    

        this.query = this.query.find(JSON.parse(queryString))
        return this
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryString.page) || 1

        const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this
    }
}
module.exports = ApiFeatures