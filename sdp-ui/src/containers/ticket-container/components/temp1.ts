import * as rx from 'rxjs';

const Amazon = {};
const Facebook = {};
const renderLogo = (brandName: string): any => {
    const Logos = {
        'Amazon': Amazon,
        'Facebook': Facebook,
    };

    return Logos[brandName] || someDefault;

}