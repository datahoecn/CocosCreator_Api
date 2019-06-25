var self = this;
cc.loader.loadResDir('pet/dragon', function(err, assets){
	if(err){
		return;
	}
	if(assets.length <= 0){  
        return;  
    }  

    var newHero = new cc.Node();  
    self.node.addChild(newHero);  
    var dragonDisplay = newHero.addComponent(dragonBones.ArmatureDisplay);  
    for(var i in assets){  
        if(assets[i] instanceof dragonBones.DragonBonesAsset){  
            dragonDisplay.dragonAsset = assets[i];  
        }  
        if(assets[i] instanceof dragonBones.DragonBonesAtlasAsset){  
            dragonDisplay.dragonAtlasAsset  = assets[i];  
        }  
    }  

    dragonDisplay.armatureName = 'boos1tree';  
    dragonDisplay.playAnimation('idle');  
})