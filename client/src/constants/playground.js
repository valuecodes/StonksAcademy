import { Asset, Liability } from "../courses/courseMaterial/investing/Section1";
import { Business } from "../courses/courseMaterial/investing/Section3";

export const PLAYGROUNDLIST = [
    {
        name:'compound-calculator',
        icon:'ShowChartIcon',
        desc:'Compound calculator simulation with different parameters',
        component:Asset
    },
    {
        name:'liability-calculator',
        icon:'EqualizerIcon',
        desc:'Liability calculator with car expenses',
        component:Liability
    },
    {
        name:'business-simulator',
        icon:'DonutLargeIcon',
        desc:'Learn how business works with restaurant example',
        component:Business
    },
]