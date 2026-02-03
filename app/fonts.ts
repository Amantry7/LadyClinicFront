import localFont from 'next/font/local'

export const gothamPro = localFont({
    src: [
        { path: '../public/fonts/gothampro_light.ttf', weight: '300', style: 'normal' },
        { path: '../public/fonts/gothampro_lightitalic.ttf', weight: '300', style: 'italic' },
        { path: '../public/fonts/gothampro.ttf', weight: '400', style: 'normal' },
        { path: '../public/fonts/gothampro_italic.ttf', weight: '400', style: 'italic' },
        { path: '../public/fonts/gothampro_medium.ttf', weight: '500', style: 'normal' },
        { path: '../public/fonts/gothampro_mediumitalic.ttf', weight: '500', style: 'italic' },
        { path: '../public/fonts/gothampro_bold.ttf', weight: '700', style: 'normal' },
        { path: '../public/fonts/gothampro_bolditalic.ttf', weight: '700', style: 'italic' },
        { path: '../public/fonts/gothampro_black.ttf', weight: '900', style: 'normal' },
        { path: '../public/fonts/gothampro_blackitalic.ttf', weight: '900', style: 'italic' },
    ],
    variable: '--font-gotham',
    display: 'swap',
})

export const sfProText = localFont({
    src: [
        { path: '../public/fonts/SFProText-Light.ttf', weight: '300', style: 'normal' },
        { path: '../public/fonts/SFProText-LightItalic.ttf', weight: '300', style: 'italic' },
        { path: '../public/fonts/SFProText-Regular.ttf', weight: '400', style: 'normal' },
        { path: '../public/fonts/SFProText-RegularItalic.ttf', weight: '400', style: 'italic' },
        { path: '../public/fonts/SFProText-Medium.ttf', weight: '500', style: 'normal' },
        { path: '../public/fonts/SFProText-MediumItalic.ttf', weight: '500', style: 'italic' },
        { path: '../public/fonts/SFProText-Semibold.ttf', weight: '600', style: 'normal' },
        { path: '../public/fonts/SFProText-SemiboldItalic.ttf', weight: '600', style: 'italic' },
        { path: '../public/fonts/SFProText-Bold.ttf', weight: '700', style: 'normal' },
        { path: '../public/fonts/SFProText-BoldItalic.ttf', weight: '700', style: 'italic' },
        { path: '../public/fonts/SFProText-Heavy.ttf', weight: '800', style: 'normal' },
        { path: '../public/fonts/SFProText-HeavyItalic.ttf', weight: '800', style: 'italic' },
    ],
    variable: '--font-sf',
    display: 'swap',
})
