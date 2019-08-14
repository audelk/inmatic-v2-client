import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [  
    {
        id       : 'dashboard',
        title    : 'Contacts    ',               
        type     : 'item',
        icon     : 'perm_contact_calendar',
        url      : '/client/contacts',
    },
    {
        id       : 'downloads',
        title    : 'Downloads',       
        type     : 'item',
        icon     : 'arrow_downward',
        url: '/client/downloads'        
    },

    {
        id       : 'analytics',
        title    : 'Analytics',
        type     : 'item',
        icon     : 'graphic_eq',
        url      : '/client/analytics'       
    },
    {
        id       : 'training',
        title    : 'Training',
        type     : 'item',
        icon     : 'ondemand_video',
        url      : '/client/training'       
    },
    
        
];
