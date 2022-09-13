jQuery(document).ready(()=>{

    /* Data Blocks */
    let dataBlockTriggers = jQuery(".ccs-db");
    let dataBlocks = jQuery(".ccs-db-content");
    let activeDataBlock = 1;

    dataBlockTriggers.click((e)=>{

        let targetId = e.currentTarget.dataset.target;
        let trigger = jQuery(e.currentTarget);
        let target = jQuery(`.ccs-db-content[data-id='${targetId}']`);

        if(activeDataBlock == targetId) return;

        dataBlockTriggers.removeClass("active");
        dataBlocks.removeClass("active");
        trigger.addClass("active");
        target.addClass("active");
        activeDataBlock = targetId;
    });

    /* Accordions */
    let accordions = jQuery(".ccs-accordion");
    accordions.click((e) => {
        const inactiveIcon = "fa-square-plus";
        const activeIcon = "fa-square-minus";

        let trigger = jQuery(e.currentTarget);
        let triggerIcon =  trigger.find("i");
        let content = trigger.find(".ccs-accordion-content");

        trigger.toggleClass("active");
        if(trigger.hasClass("active")) 
            triggerIcon.removeClass(inactiveIcon).addClass(activeIcon);
        else 
            triggerIcon.removeClass(activeIcon).addClass(inactiveIcon);

        content.stop().slideToggle(200);
    });

    /* Bootcamp landing */
    particlesJS.load('bootcamp-landing', 'https://ccsla-static.herokuapp.com/public/js/polygon.config.js', () => {
        
    });
        
});