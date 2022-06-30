<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');
$routes->get('/accounts', 'Auth::index');

//routes recovepass
$routes->post('/forgetPassword', 'Auth::forgetPassword');
$routes->get('/getPageExpire/(:hash)/(:hash)/' , 'Auth::pageExpire/$1/$2');
$routes->post('/updatePassword', 'Auth::updatePassword');
//end routes recovepass

//routes login
$routes->post('/login', 'Auth::login');
//end routes login

//routes managers crete,read,update,delete
$routes->get('/managers', 'Managers::index');
$routes->post('/managers/register', 'Managers::RegisterManager');
$routes->post('/managers/update', 'Managers::updateManager');
$routes->post('/managers/delete', 'Managers::deleteManager');
//end routes managers crete,read,update,delete

//routes works crete,read,update,delete
$routes->get('/works', 'Works::index');
$routes->post('/works/register', 'Works::registerWork');
$routes->post('/works/update', 'Works::updateWork');
$routes->post('/works/delete', 'Works::deleteWork');
//end routes works crete,read,update,delete

//routes workers crete,read,update,delete
$routes->get('/workers', 'Workers::index');
$routes->post('/workers/register', 'Workers::registerWorker');
$routes->post('/workers/update', 'Workers::updateWorker');
$routes->post('/workers/delete', 'Workers::deleteWorker');
//end routes workers crete,read,update,delete

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
