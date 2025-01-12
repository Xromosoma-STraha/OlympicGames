export interface IMenuItem{
    name:string
    url:string
    icon:string
}

export const MENU_DATA:IMenuItem[]=[{
    icon:'radix-icons:dashboard',
    name:'Countries count',
    url:'/'
    },
    {
        icon:'radix-icons:plus-circled',
        name:'Athlets',
       url:'/Athlets'
    },
    {
        icon:'radix-icons:gear',
        name:'Sports',
        url:'/sports'
    },
   
     {
        icon:'majesticons:academic-cap-line',
        name:'Records',
       url:'/records'
    },
    {
        icon:'majesticons:academic-cap-line',
        name:'Olympic Games',
       url:'/Olympic_Games'
    }
]