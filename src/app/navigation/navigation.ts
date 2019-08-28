import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [  
    {
        id       : 'analytics',
        title    : 'Analytics',
        type     : 'item',
        icon     : 'graphic_eq',
        url      : '/client/analytics'       
    },
    {
        id       : 'inbox',
        title    : 'Inbox    ',               
        type     : 'item',
        icon     : 'inbox',
        url      : '/client/inbox',
    },
    {
        id       : 'downloads',
        title    : 'Downloads',       
        type     : 'item',
        icon     : 'arrow_downward',
        url: '/client/downloads'        
    },
    
    {
        id       : 'training',
        title    : 'Training',
        type     : 'item',
        icon     : 'ondemand_video',
        url      : '/client/training'       
    },
    
        
];
