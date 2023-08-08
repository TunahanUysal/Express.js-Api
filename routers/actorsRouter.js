const router = require("express").Router();
let data=require("../data.js");

const Actor=require("../data/data-model.js");



router.get("/",(req,res,next)=>{

    Actor.findActor().then((actors)=>{
        res.status(200).json(actors);
    }).catch((error)=>{
        next({
            statusCode:500,
            errorMessage:"Aktorler alınırken hata olustu.",
            error
        })
    })

})

router.get("/:id",(req,res,next)=>{
    const {id}=req.params;
    Actor.findActorById(id).then(actor=>{
        if(actor){
            res.status(200).json(actor);

        }
        else {
            next({
               statusCode:400,
               errorMessage:"Aradıgınız aktor sistemde mevcut degildir!" 
            })
        }
        
    }).catch(error=>{
        next({
            statusCode:500,
            errorMessage:"Aradıgınız aktor bulunamadı",
            error
        })
    })


  
});



router.post("/",(req,res,next)=>{

    const newActor=req.body;

    if(!newActor.name){

        next({
            statusCode:400,
            errorMessage:"Aktor eklemek icin isim girmelisiniz."
        })
    }
    else{
        Actor.addActor(newActor).then(added=>{
            res.status(201).json(added);
        }).catch(error=>{
            next({
                statusCode:500,
                errorMessage:"Aktor eklerken hata olustu",
                error
            })
        })
    }

});

router.delete("/:id",(req,res,next)=>{

    const {id}=req.params;

    Actor.findActorById(id).then(deletedActor=>{
        if(deletedActor){

            Actor.deleteActor(id).then(deleted=>{
                if(deleted){
                    res.status(204).end();
                }
            }).catch(error=>{
                next({
                    statusCode:500,
                    errorMessage:"Aktor silinirken hata olustu.",
                    error
                })
            })

        }
        else {
            next({
                statusCode:400,
                errorMessage:"Silmeye calıstıgınız aktor sistemde mevcut degildir"
            })
        }
    }).catch(error=>{
        next({
            statusCode:500,
            errorMessage:"Aradıgınız aktor bulunamadı",
            error
        })
    })

   

   
});

router.put("/:id",(req,res,next)=>{
    const {id}=req.params;
    const updateActor=req.body;

    if(!updateActor.name){
        next({statusCode:400,errorMessage:"Lutfen aktor ismini giriniz!"})

    }

    Actor.findActorById(id).then(actor=>{
        if(actor){
            Actor.updateActor(updateActor,id).then(updated=>{
                res.status(200).json(updated);
            }).catch(error=>{
                next({
                    statusCode:500,
                    errorMessage:"Aktor guncellenemedii",
                    error
                })
            })

        }
        else {
            next({statusCode:400,errorMessage:"Sistemde boyle bir aktor mevcut degildir!"})
        }
    }).catch(error=>{
        next({
            statusCode:500,
            errorMessage:"Aktor guncellenemedi!",
            error
        })
    })

    
})

router.patch("/:id",(req,res,next)=>{

    const {id}=req.params;

    const updatedActor=req.body;

    if(!updatedActor.name){
        next({
            statusCode:400,
            errorMessage:"Aktor ismi bos olamaz!"
        })
    }

    Actor.updateActor(updatedActor,id).then(updated=>{
        res.status(200).json(updated);
    }).catch(error=>{
        next({
            statusCode:500,
            errorMessage:"Akor duzenlerken hata olustu",
            error
        })
    })
})
    

module.exports=router;

