import { extend } from 'vee-validate';
import { required, email, integer, min, max, confirmed } from 'vee-validate/dist/rules.umd.js';

extend('required', required);
extend('email', email);
extend('integer', integer);
extend('min', min);
extend('max', max);
extend('confirmed', confirmed);
