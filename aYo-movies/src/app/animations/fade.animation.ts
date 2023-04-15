import { animate, state, style, transition, trigger } from '@angular/animations';

const fadeInOut = trigger('fadeInOut',
    [
        // route 'enter' transition
        transition(':enter', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.5s', style({ opacity: 1 }))
        ])
    ]
);

export { fadeInOut };