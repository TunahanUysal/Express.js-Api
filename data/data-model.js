const db=require("./db-config.js");

module.exports={
    findActor,addActor,updateActor,deleteActor,findActorById
}

function findActor(){

    return db("actor");
}

function addActor(newActor){

    return db("actor").insert(newActor,"id").then(([id])=>{
        return db("actor").where({id}).first();
    })
}

function updateActor(updatedActor,id){
    return db("actor")
    .update(updatedActor)
    .where({id})
    .then(updated=>{
        if(updated){
            return db("actor").where({id}).first();
        }
    })
}

function deleteActor(id){
    return db("actor").del().where({id});
}

function findActorById(id){
    return db("actor").where({id}).first();
}