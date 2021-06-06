import { extend } from 'vee-validate';
import { required, email, integer, min, confirmed } from 'vee-validate/dist/rules.umd.js';

extend('required', required);
extend('email', email);
extend('integer', integer);
extend('min', min);
extend('confirmed', confirmed);
