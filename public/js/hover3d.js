/*
    Author: Gurparsad Singh Bajwa
    Github: https://github.com/brinxade/
    Feel free to use in personal or commercial projects
*/

jQuery(function($) {
    
    $(document).ready(function(){

        var mouse={x:0, y:0};
        document.onmousemove=(e)=>{mouse.x=e.pageX; mouse.y=e.pageY};
    
        (function ( $ ) {
    
            $.fn.mouseHover3d = function(givenSettings) {
                const innerContainerClass=".inner";
                const defaultSettings={
                    enableShadow:true,
                    primaryColor:"#fff",
                    shadowColor:"#ccc",
                    restoreTime:500,
                    updateRate:20,
                    rotationStrength:20
                };
    
                const angleToRad=2*Math.PI/360;
                var settings=$.extend({},defaultSettings, givenSettings);
                var containers=$(this);
                containers.css({position:'relative'});
                containers.find(innerContainerClass).css({background:settings.primaryColor, height:'100%'});
    
                return containers.each((index)=>{
                    var container=$(containers[index]);
                    var gradAngle,power;
                    var intervalIdHover, intervalIdUnhover, restorationStarted, timeoutIdUnhover;
    
                    function bendBox(elem){
                        const elementToTransform=elem.find(innerContainerClass);
                        const offset=elem.offset();
                        let mouseLocalX=Math.abs(offset.left-mouse.x);
                        let mouseLocalY=Math.abs(offset.top-mouse.y);
                        let offsetX=mouseLocalX-(elem.width()/2);
                        let offsetY=(elem.height()/2)-mouseLocalY;
                        let angleX=offsetX/(elem.width()/2);
                        let angleY=offsetY/(elem.height()/2);
                        power=Math.sqrt(Math.pow(angleX,2)+Math.pow(angleY,2))*settings.rotationStrength;
                        gradAngle=Math.atan(offsetY/offsetX)*360/(2*Math.PI);
    
                        if(offsetX<0)
                            gradAngle=180+gradAngle;
                        else
                            if(offsetY<0)
                                gradAngle=360+gradAngle;
    
                        gradAngle=270-gradAngle;
                        angleX=Math.sin(gradAngle*angleToRad);
                        angleY=Math.cos(gradAngle*angleToRad);    
    
                        let clr1=power*(1+settings.rotationStrength/100);
                        let clr2=100-power;
    
                        if(settings.enableShadow)
                            elementToTransform[0].style.background=`linear-gradient(${gradAngle}deg, ${settings.shadowColor} ${clr1}%, ${settings.primaryColor} ${clr2}%)`;
                        elementToTransform[0].style.transform=`rotate3d(${angleY},${angleX},0,${power}deg)`;
                        
                    }
    
                    function restoreBox(elem)
                    {
                        const timeElapsed=+new Date() - restorationStarted;
                        const restoreFactor=power/settings.restoreTime;
                        const elementToTransform=elem.find(innerContainerClass);
    
                        let newPower=power-restoreFactor*timeElapsed;
                        let angleX=Math.sin(gradAngle*angleToRad);
                        let angleY=Math.cos(gradAngle*angleToRad);    
    
                        let clr1=newPower*(1+settings.rotationStrength/100);
                        let clr2=100-newPower;
    
                        if(settings.enableShadow)
                            elementToTransform[0].style.background=`linear-gradient(${gradAngle}deg, ${settings.shadowColor} ${clr1}%, ${settings.primaryColor} ${clr2}%)`;
                        elementToTransform[0].style.transform=`rotate3d(${angleY},${angleX},0,${newPower}deg)`;
                        
                    }
    
                    container.hover(()=>{
                        // Card bend logic
                        clearTimeout(timeoutIdUnhover);
                        clearInterval(intervalIdUnhover);
                        intervalIdHover=setInterval(()=>{
                            bendBox(container);
                        }, settings.updateRate);
                    }, ()=>{
                        // Card restoration logic
                        clearInterval(intervalIdHover);
                        restorationStarted= +new Date();
                        intervalIdUnhover=setInterval(()=>{
                            restoreBox(container)
                        }, settings.updateRate);
                        timeoutIdUnhover=setTimeout(()=>{
                            clearInterval(intervalIdUnhover)
                        },settings.restoreTime);
                    });
            
                });
            };
    
        }( jQuery ));
    
    });

});