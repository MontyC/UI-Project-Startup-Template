
import React from 'react';
import ReactDOM from 'react-dom';

import { 
    Header, 
    Search,
    MobileNav, 
    RightNav,
    DestinationsMenu, 
    Tiles, 
    HeroCarousel, 
    HeroImageCarousel,
    TourItinerary,
    TourMap,
    BrandIsDifferent, 
    Footer, 
    ShowMore,
    LoadMore,
    AnchorLinks,
    Accordion,
    Social,
    Destinations,
    ContactFormContainer,
    NewsletterFormContainer,
    BrochureFormContainer,
    VideoBlock,

    ResponsiveBackgroundImage
} from '../components';


export default class LocationChecker {
    constructor() {
        this.initialiseGlobals();
        this.checkLocation();
    }

    initialiseGlobals = () => {
        new Header();
        new Search();
        new MobileNav();
        new DestinationsMenu();
        new Footer();

        // Responsive Background Images
        let elements = document.querySelectorAll('[data-responsive-background-image]'); 
        if (elements.length > 0)
            (Array.from(elements)).forEach(element => new ResponsiveBackgroundImage(element));
    }

    checkLocation = () => {

        // Right Nav
        const rightNav = $('.right-navigation__title');
        if (rightNav.length) 
            new RightNav();

        // Hero Carousel
        const heroCarouselContainer = $('.hero-carousel');
        if (heroCarouselContainer.length) 
            new HeroCarousel();

        // Hero Image Carousel
        const heroImageCarouselContainer = $('.hero-image-carousel');
        if (heroImageCarouselContainer.length) 
            new HeroImageCarousel();

        // Tiles
        const slider = $('.tile-carousel');
        if (slider.length) 
            new Tiles();

        // Brand Is Different
        const brandIsDifferentContent = $('.brand-is-different__main-content-wrapper');
        if (brandIsDifferentContent.length) 
            new BrandIsDifferent(brandIsDifferentContent);

        // Show More links
        const showMoreLinks = $('.show-more');
        if (showMoreLinks.length) 
            showMoreLinks.each((index, el) => new ShowMore($(el)));

        // Tour Itinerary
        const tourItinerary = $('.tour-itinerary');
        if (tourItinerary.length) {
            new TourItinerary();
            //new TourMap();
        }

        // Anchor Links
        const anchorLinks = $('.anchor-links');
        if (anchorLinks.length) 
            new AnchorLinks();

        // Continent - Destinations
        const destinations = $('.destinations');
        if (destinations.length) {
            const $loadMoreButton = $('.destinations__more-button');
            new LoadMore($loadMoreButton);
        }

        // Continent - Destinations Mobile
        const destinationsMobile = $('.destinations-mobile__slider');
        if (destinationsMobile.length) 
            new Destinations();

        // Accordion
        const accordion = $('.accordion');
        if (accordion.length) 
            new Accordion();

        // Social 
        const social = new Social();

        // Stackla
        const stackla = $('.stackla-widget');
        if (stackla.length)
            social.initialiseStackla();

        // AddThis
        const addThis = $('.addthis_inline_share_toolbox');
        if (addThis.length)
            social.initialiseAddThis();

        // Contact us Form
        const contactForm = $('.contact__form');
        if (contactForm.length) 
            ReactDOM.render(<ContactFormContainer />, document.getElementById('contactForm'));

        // Newsletter Form
        const newsletterForm = $('.newsletter__form');
        if (newsletterForm.length) 
            ReactDOM.render(<NewsletterFormContainer />, document.getElementById('newsletterForm'));
        
        // Brochure Form
        const brochureForm = $('.brochure__form');
        if (brochureForm.length) 
            ReactDOM.render(<BrochureFormContainer />, document.getElementById('brochureForm'));

        // Video Block
        const videoContainer = ('.lightbox__video');
        if (videoContainer.length)
            new VideoBlock(videoContainer);
    }
}