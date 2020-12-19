import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;

  // corsi = [
  //   {
  //     'id': 1,
  //     'course': 'TypeScript',
  //     'idCategory': 1,
  //     'category': 'Fundamentals',
  //     'slug': 'introduzione-ad-es6/ts,-babel-e-webpack-(8:48)',
  //     'title': 'Introduzione ad ES6/TS, Babel e Webpack (8:48)',
  //     'time': '8:48',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/6878039'
  //   },
  //   {
  //     'id': 2,
  //     'course': 'TypeScript',
  //     'idCategory': 1,
  //     'category': 'Fundamentals',
  //     'slug': 'javascript-es6---cheatsheet',
  //     'title': 'Javascript ES6 - Cheatsheet',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8626735'
  //   },
  //   {
  //     'id': 3,
  //     'course': 'TypeScript',
  //     'idCategory': 1,
  //     'category': 'Fundamentals',
  //     'slug': 'var-vs-let---block-scope-vs-function-scope-(4:06)',
  //     'title': 'var vs let - Block Scope vs Function Scope (4:06)',
  //     'time': '4:06',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/6877756'
  //   },
  //   {
  //     'id': 4,
  //     'course': 'TypeScript',
  //     'idCategory': 1,
  //     'category': 'Fundamentals',
  //     'slug': 'le-costanti:-const---mutabilità-vs-immutabilità-(6:23)',
  //     'title': 'Le costanti: const - Mutabilità vs Immutabilità (6:23)',
  //     'time': '6:23',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/6877757'
  //   },
  //   {
  //     'id': 5,
  //     'course': 'TypeScript',
  //     'idCategory': 1,
  //     'category': 'Fundamentals',
  //     'slug': 'template-literals:-stringhe-multiline-con-espressioni-(3:58)',
  //     'title': 'Template literals: stringhe multiline con espressioni (3:58)',
  //     'time': '3:58',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/6877755'
  //   },
  //   {
  //     'id': 6,
  //     'course': 'TypeScript',
  //     'idCategory': 1,
  //     'category': 'Fundamentals',
  //     'slug': 'short-object-syntax-(2:26)',
  //     'title': 'Short Object syntax (2:26)',
  //     'time': '2:26',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/6878160'
  //   },
  //   {
  //     'id': 7,
  //     'course': 'TypeScript',
  //     'idCategory': 1,
  //     'category': 'Fundamentals',
  //     'slug': 'destructuring-array-(3:38)',
  //     'title': 'Destructuring Array (3:38)',
  //     'time': '3:38',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/6878163'
  //   },
  //   {
  //     'id': 8,
  //     'course': 'TypeScript',
  //     'idCategory': 1,
  //     'category': 'Fundamentals',
  //     'slug': 'destructuring-object---part-1-(5:47)',
  //     'title': 'Destructuring Object - part 1 (5:47)',
  //     'time': '5:47',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8637315'
  //   },
  //   {
  //     'id': 9,
  //     'course': 'TypeScript',
  //     'idCategory': 1,
  //     'category': 'Fundamentals',
  //     'slug': 'destructuring-object---part-2:-nested-props-(3:27)',
  //     'title': 'Destructuring Object - part 2: nested props (3:27)',
  //     'time': '3:27',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8637319'
  //   },
  //   {
  //     'id': 10,
  //     'course': 'TypeScript',
  //     'idCategory': 1,
  //     'category': 'Fundamentals',
  //     'slug': 'destructuring-object---part-3:-rename-&-short-object-syntax-(2:13)',
  //     'title': 'Destructuring Object - part 3: rename & short object syntax (2:13)',
  //     'time': '2:13',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8637320'
  //   },
  //   {
  //     'id': 11,
  //     'course': 'TypeScript',
  //     'idCategory': 2,
  //     'category': 'Manipolazione dati e immutabilità',
  //     'slug': 'array-spread-operator:-clone,-merge-e-modifica-array-(3:15)',
  //     'title': 'Array Spread operator: clone, merge e modifica array (3:15)',
  //     'time': '3:15',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/6877758'
  //   },
  //   {
  //     'id': 12,
  //     'course': 'TypeScript',
  //     'idCategory': 2,
  //     'category': 'Manipolazione dati e immutabilità',
  //     'slug': 'object-spread-operator-vs-object.assign-(4:55)',
  //     'title': 'Object Spread operator vs Object.assign (4:55)',
  //     'time': '4:55',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/6877761'
  //   },
  //   {
  //     'id': 13,
  //     'course': 'TypeScript',
  //     'idCategory': 2,
  //     'category': 'Manipolazione dati e immutabilità',
  //     'slug': 'arrow-function-(4:32)',
  //     'title': 'Arrow function (4:32)',
  //     'time': '4:32',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/6877744'
  //   },
  //   {
  //     'id': 14,
  //     'course': 'TypeScript',
  //     'idCategory': 2,
  //     'category': 'Manipolazione dati e immutabilità',
  //     'slug': 'array:-map-(4:10)',
  //     'title': 'Array: map (4:10)',
  //     'time': '4:10',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/6877745'
  //   },
  //   {
  //     'id': 15,
  //     'course': 'TypeScript',
  //     'idCategory': 2,
  //     'category': 'Manipolazione dati e immutabilità',
  //     'slug': 'array:-filter-(2:41)',
  //     'title': 'Array: filter (2:41)',
  //     'time': '2:41',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8620040'
  //   },
  //   {
  //     'id': 16,
  //     'course': 'TypeScript',
  //     'idCategory': 2,
  //     'category': 'Manipolazione dati e immutabilità',
  //     'slug': 'array:-find-&-findindex-(3:29)',
  //     'title': 'Array: find & findIndex (3:29)',
  //     'time': '3:29',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8620492'
  //   },
  //   {
  //     'id': 17,
  //     'course': 'TypeScript',
  //     'idCategory': 2,
  //     'category': 'Manipolazione dati e immutabilità',
  //     'slug': 'immutabilità-in-es6,-react,-angular,-redux-(13:30)',
  //     'title': 'Immutabilità in ES6, React, Angular, Redux (13:30)',
  //     'time': '13:30',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8620520'
  //   },
  //   {
  //     'id': 18,
  //     'course': 'TypeScript',
  //     'idCategory': 2,
  //     'category': 'Manipolazione dati e immutabilità',
  //     'slug': 'classes,-ereditarietà-e-lexical-this-(6:41)',
  //     'title': 'Classes, Ereditarietà e lexical this (6:41)',
  //     'time': '6:41',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/6878162'
  //   },
  //   {
  //     'id': 19,
  //     'course': 'TypeScript',
  //     'idCategory': 3,
  //     'category': 'imports and modules',
  //     'slug': 'creazione-progetto-es6-con-webserver-e-npm-(3:01)',
  //     'title': 'Creazione progetto ES6 con webserver e npm (3:01)',
  //     'time': '3:01',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8621634'
  //   },
  //   {
  //     'id': 20,
  //     'course': 'TypeScript',
  //     'idCategory': 3,
  //     'category': 'imports and modules',
  //     'slug': 'hello-es6:-il-tag-"script"-(1:38)',
  //     'title': 'Hello ES6: il tag "script" (1:38)',
  //     'time': '1:38',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8621630'
  //   },
  //   {
  //     'id': 21,
  //     'course': 'TypeScript',
  //     'idCategory': 3,
  //     'category': 'imports and modules',
  //     'slug': 'import-modules-e-type="module"-(5:34)',
  //     'title': 'Import modules e type="module" (5:34)',
  //     'time': '5:34',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8621632'
  //   },
  //   {
  //     'id': 22,
  //     'course': 'TypeScript',
  //     'idCategory': 3,
  //     'category': 'imports and modules',
  //     'slug': 'import-as-(1:56)',
  //     'title': 'Import as (1:56)',
  //     'time': '1:56',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8621628'
  //   },
  //   {
  //     'id': 23,
  //     'course': 'TypeScript',
  //     'idCategory': 3,
  //     'category': 'imports and modules',
  //     'slug': 'import-default-(5:23)',
  //     'title': 'Import default (5:23)',
  //     'time': '5:23',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8621731'
  //   },
  //   {
  //     'id': 24,
  //     'course': 'TypeScript',
  //     'idCategory': 4,
  //     'category': 'Video by Andrea Simone Costa',
  //     'slug': 'promises-(8:39)',
  //     'title': 'Promises (8:39)',
  //     'time': '8:39',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8624595'
  //   },
  //   {
  //     'id': 25,
  //     'course': 'TypeScript',
  //     'idCategory': 4,
  //     'category': 'Video by Andrea Simone Costa',
  //     'slug': 'fetch:-comunicazione-con-il-server-(2:53)',
  //     'title': 'Fetch: comunicazione con il server (2:53)',
  //     'time': '2:53',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8698077'
  //   },
  //   {
  //     'id': 26,
  //     'course': 'TypeScript',
  //     'idCategory': 4,
  //     'category': 'Video by Andrea Simone Costa',
  //     'slug': 'async-await-(2:31)',
  //     'title': 'Async Await (2:31)',
  //     'time': '2:31',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/8698079'
  //   },
  //   {
  //     'id': 27,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'introduzione-a-typescript-(1:29)',
  //     'title': 'Introduzione a TypeScript (1:29)',
  //     'time': '1:29',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743401'
  //   },
  //   {
  //     'id': 28,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'utilizzare-il-mio-playground-typescript-(3:45)',
  //     'title': 'Utilizzare il mio playground TypeScript (3:45)',
  //     'time': '3:45',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743194'
  //   },
  //   {
  //     'id': 29,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'utilizzare-on-line-playground:-stackblitz-(3:19)',
  //     'title': 'Utilizzare on-line playground: StackBlitz (3:19)',
  //     'time': '3:19',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743190'
  //   },
  //   {
  //     'id': 30,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'inferenza-in-typescript-(2:36)',
  //     'title': 'Inferenza in TypeScript (2:36)',
  //     'time': '2:36',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743197'
  //   },
  //   {
  //     'id': 31,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'primitives-types-(4:17)',
  //     'title': 'Primitives Types (4:17)',
  //     'time': '4:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743193'
  //   },
  //   {
  //     'id': 32,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'tipizzare-oggetti-usando-interface-e-gestione-proprietà-opzionali-(5:55)',
  //     'title': 'Tipizzare oggetti usando interface e gestione proprietà opzionali (5:55)',
  //     'time': '5:55',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743195'
  //   },
  //   {
  //     'id': 33,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'tipizzare-oggetti-complessi-(4:14)',
  //     'title': 'Tipizzare oggetti complessi (4:14)',
  //     'time': '4:14',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743191'
  //   },
  //   {
  //     'id': 34,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'tipizzare-array-(3:15)',
  //     'title': 'Tipizzare array (3:15)',
  //     'time': '3:15',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743192'
  //   },
  //   {
  //     'id': 35,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'utilizzo-di-class-e-type-per-la-tipizzazione-(6:15)',
  //     'title': 'Utilizzo di class e type per la tipizzazione (6:15)',
  //     'time': '6:15',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743196'
  //   },
  //   {
  //     'id': 36,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'classi:-private-vs-public-(1:41)',
  //     'title': 'Classi: private vs public (1:41)',
  //     'time': '1:41',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743199'
  //   },
  //   {
  //     'id': 37,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'classi:-getter-&-setter-(3:42)',
  //     'title': 'Classi: getter & setter (3:42)',
  //     'time': '3:42',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743198'
  //   },
  //   {
  //     'id': 38,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'tipizzare-funzioni-(5:02)',
  //     'title': 'Tipizzare funzioni (5:02)',
  //     'time': '5:02',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743444'
  //   },
  //   {
  //     'id': 39,
  //     'course': 'TypeScript',
  //     'idCategory': 5,
  //     'category': 'TypeScript: fundamentals',
  //     'slug': 'type,-literals-e-introduzione-a-union-types-(1:56)',
  //     'title': 'Type, literals e introduzione a Union types (1:56)',
  //     'time': '1:56',
  //     'url': 'https://fabiobiondi.teachable.com/courses/448018/lectures/23743283'
  //   },
  //   {
  //     'id': 40,
  //     'course': 'Angular',
  //     'idCategory': 6,
  //     'category': 'Panoramica',
  //     'slug': 'introduzione-al-corso-(4:44)',
  //     'title': 'Introduzione al corso (4:44)',
  //     'time': '4:44',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8524050'
  //   },
  //   {
  //     'id': 41,
  //     'course': 'Angular',
  //     'idCategory': 6,
  //     'category': 'Panoramica',
  //     'slug': 'gli-argomenti-del-corso-in-dettaglio-(5:03)',
  //     'title': 'Gli argomenti del corso in dettaglio (5:03)',
  //     'time': '5:03',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6833314'
  //   },
  //   {
  //     'id': 42,
  //     'course': 'Angular',
  //     'idCategory': 6,
  //     'category': 'Panoramica',
  //     'slug': 'single-page-applications-e-approccio-component-based-(14:37)',
  //     'title': 'Single Page Applications e approccio component-based (14:37)',
  //     'time': '14:37',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6762939'
  //   },
  //   {
  //     'id': 43,
  //     'course': 'Angular',
  //     'idCategory': 6,
  //     'category': 'Panoramica',
  //     'slug': 'angular-framework:-le-funzionalità-principali-(17:17)',
  //     'title': 'Angular Framework: le funzionalità principali (17:17)',
  //     'time': '17:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6762950'
  //   },
  //   {
  //     'id': 44,
  //     'course': 'Angular',
  //     'idCategory': 6,
  //     'category': 'Panoramica',
  //     'slug': 'gruppo-facebook,-supporto-e-link',
  //     'title': 'Gruppo Facebook, supporto e Link',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8941746'
  //   },
  //   {
  //     'id': 45,
  //     'course': 'Angular',
  //     'idCategory': 7,
  //     'category': 'Installazione e configurazione',
  //     'slug': 'installazione-e-utilizzo-di-nodejs-e-nvm-(4:16)',
  //     'title': 'Installazione e utilizzo di NodeJS e NVM (4:16)',
  //     'time': '4:16',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6761849'
  //   },
  //   {
  //     'id': 46,
  //     'course': 'Angular',
  //     'idCategory': 7,
  //     'category': 'Installazione e configurazione',
  //     'slug': 'installare-angular-cli-e-creare-un-progetto-angular-(2:34)',
  //     'title': 'Installare Angular CLI e creare un progetto Angular (2:34)',
  //     'time': '2:34',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6761850'
  //   },
  //   {
  //     'id': 47,
  //     'course': 'Angular',
  //     'idCategory': 7,
  //     'category': 'Installazione e configurazione',
  //     'slug': 'introduzione-al-boilerplate-(2:05)',
  //     'title': 'Introduzione al boilerplate (2:05)',
  //     'time': '2:05',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6761853'
  //   },
  //   {
  //     'id': 48,
  //     'course': 'Angular',
  //     'idCategory': 7,
  //     'category': 'Installazione e configurazione',
  //     'slug': 'appcomponent-e-appmodule:-parte-1---intro-(3:50)',
  //     'title': 'AppComponent e AppModule: parte 1 - intro (3:50)',
  //     'time': '3:50',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6761860'
  //   },
  //   {
  //     'id': 49,
  //     'course': 'Angular',
  //     'idCategory': 7,
  //     'category': 'Installazione e configurazione',
  //     'slug': 'appcomponent-e-appmodule:-parte-2---code-(3:44)',
  //     'title': 'AppComponent e AppModule: parte 2 - code (3:44)',
  //     'time': '3:44',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6768290'
  //   },
  //   {
  //     'id': 50,
  //     'course': 'Angular',
  //     'idCategory': 7,
  //     'category': 'Installazione e configurazione',
  //     'slug': 'ng-new:-parametri-(1:59)',
  //     'title': 'ng new: parametri (1:59)',
  //     'time': '1:59',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6768268'
  //   },
  //   {
  //     'id': 51,
  //     'course': 'Angular',
  //     'idCategory': 7,
  //     'category': 'Installazione e configurazione',
  //     'slug': 'update-angular-10:-leggere-per-evitare-warning-(1:33)',
  //     'title': 'UPDATE ANGULAR 10: leggere per evitare warning (1:33)',
  //     'time': '1:33',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/22502348'
  //   },
  //   {
  //     'id': 52,
  //     'course': 'Angular',
  //     'idCategory': 8,
  //     'category': 'Fundamentals',
  //     'slug': 'interpolation-{{value}}-(1:10)',
  //     'title': 'Interpolation {{value}} (1:10)',
  //     'time': '1:10',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6758655'
  //   },
  //   {
  //     'id': 53,
  //     'course': 'Angular',
  //     'idCategory': 8,
  //     'category': 'Fundamentals',
  //     'slug': 'native-events:-mouse-e-tastiera-(5:48)',
  //     'title': 'Native events: mouse e tastiera (5:48)',
  //     'time': '5:48',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6758684'
  //   },
  //   {
  //     'id': 54,
  //     'course': 'Angular',
  //     'idCategory': 8,
  //     'category': 'Fundamentals',
  //     'slug': 'directives-(5:19)',
  //     'title': 'Directives (5:19)',
  //     'time': '5:19',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6758732'
  //   },
  //   {
  //     'id': 55,
  //     'course': 'Angular',
  //     'idCategory': 8,
  //     'category': 'Fundamentals',
  //     'slug': 'attributi-e-parentesi-quadre-(brackets)-(6:29)',
  //     'title': 'Attributi e parentesi quadre (brackets) (6:29)',
  //     'time': '6:29',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6758851'
  //   },
  //   {
  //     'id': 56,
  //     'course': 'Angular',
  //     'idCategory': 8,
  //     'category': 'Fundamentals',
  //     'slug': 'components-(5:07)',
  //     'title': 'Components (5:07)',
  //     'time': '5:07',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6760703'
  //   },
  //   {
  //     'id': 57,
  //     'course': 'Angular',
  //     'idCategory': 8,
  //     'category': 'Fundamentals',
  //     'slug': 'pipes-(5:17)',
  //     'title': 'Pipes (5:17)',
  //     'time': '5:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6760557'
  //   },
  //   {
  //     'id': 58,
  //     'course': 'Angular',
  //     'idCategory': 8,
  //     'category': 'Fundamentals',
  //     'slug': 'custom-types-(5:46)',
  //     'title': 'Custom Types (5:46)',
  //     'time': '5:46',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6760583'
  //   },
  //   {
  //     'id': 59,
  //     'course': 'Angular',
  //     'idCategory': 8,
  //     'category': 'Fundamentals',
  //     'slug': 'introduzione-ai-service-e-alla-dependency-injection-(3:52)',
  //     'title': 'Introduzione ai service e alla dependency injection (3:52)',
  //     'time': '3:52',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6758779'
  //   },
  //   {
  //     'id': 60,
  //     'course': 'Angular',
  //     'idCategory': 8,
  //     'category': 'Fundamentals',
  //     'slug': 'comunicazione-con-server,-rest-api-e-httpclient-(5:03)',
  //     'title': 'Comunicazione con server, REST API e HttpClient (5:03)',
  //     'time': '5:03',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6760608'
  //   },
  //   {
  //     'id': 61,
  //     'course': 'Angular',
  //     'idCategory': 9,
  //     'category': 'Angular Structural Directives',
  //     'slug': 'la-direttiva-ngif-e-l\'opzione-ngif...else-(6:02)',
  //     'title': 'La direttiva ngIf e l\'opzione ngIf...else (6:02)',
  //     'time': '6:02',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6774988'
  //   },
  //   {
  //     'id': 62,
  //     'course': 'Angular',
  //     'idCategory': 9,
  //     'category': 'Angular Structural Directives',
  //     'slug': 'la-direttiva-ngfor:-introduzione-e-tipizzare-collezioni-(6:59)',
  //     'title': 'La direttiva ngFor: introduzione e tipizzare collezioni (6:59)',
  //     'time': '6:59',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775041'
  //   },
  //   {
  //     'id': 63,
  //     'course': 'Angular',
  //     'idCategory': 9,
  //     'category': 'Angular Structural Directives',
  //     'slug': 'la-direttiva-ngfor:-proprietà-index,-last,-odd-(3:30)',
  //     'title': 'La direttiva ngFor: proprietà index, last, odd (3:30)',
  //     'time': '3:30',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775090'
  //   },
  //   {
  //     'id': 64,
  //     'course': 'Angular',
  //     'idCategory': 9,
  //     'category': 'Angular Structural Directives',
  //     'slug': 'la-direttiva-ngfor:-manipolazione-dati-(5:58)',
  //     'title': 'La direttiva ngFor: manipolazione dati (5:58)',
  //     'time': '5:58',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775096'
  //   },
  //   {
  //     'id': 65,
  //     'course': 'Angular',
  //     'idCategory': 9,
  //     'category': 'Angular Structural Directives',
  //     'slug': 'la-direttiva-ngswitch-(4:53)',
  //     'title': 'La direttiva ngSwitch (4:53)',
  //     'time': '4:53',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775098'
  //   },
  //   {
  //     'id': 66,
  //     'course': 'Angular',
  //     'idCategory': 10,
  //     'category': 'Styling',
  //     'slug': 'styles-and-components-(4:06)',
  //     'title': 'Styles and Components (4:06)',
  //     'time': '4:06',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6774991'
  //   },
  //   {
  //     'id': 67,
  //     'course': 'Angular',
  //     'idCategory': 10,
  //     'category': 'Styling',
  //     'slug': 'inline-css-class-(2:08)',
  //     'title': 'Inline CSS class (2:08)',
  //     'time': '2:08',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775023'
  //   },
  //   {
  //     'id': 68,
  //     'course': 'Angular',
  //     'idCategory': 10,
  //     'category': 'Styling',
  //     'slug': 'la-direttiva-ngclass-(3:15)',
  //     'title': 'La direttiva ngClass (3:15)',
  //     'time': '3:15',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775014'
  //   },
  //   {
  //     'id': 69,
  //     'course': 'Angular',
  //     'idCategory': 10,
  //     'category': 'Styling',
  //     'slug': 'inline-styling-(3:27)',
  //     'title': 'Inline Styling (3:27)',
  //     'time': '3:27',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775027'
  //   },
  //   {
  //     'id': 70,
  //     'course': 'Angular',
  //     'idCategory': 10,
  //     'category': 'Styling',
  //     'slug': 'la-direttiva-ngstyle-(1:50)',
  //     'title': 'La direttiva ngStyle (1:50)',
  //     'time': '1:50',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775042'
  //   },
  //   {
  //     'id': 71,
  //     'course': 'Angular',
  //     'idCategory': 10,
  //     'category': 'Styling',
  //     'slug': 'librerie-css-3rd-party-e-angular.json-(6:12)',
  //     'title': 'Librerie CSS 3rd party e angular.json (6:12)',
  //     'time': '6:12',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776213'
  //   },
  //   {
  //     'id': 72,
  //     'course': 'Angular',
  //     'idCategory': 11,
  //     'category': 'Template-driven Form',
  //     'slug': 'input,-"template-reference-variables",-keyboard-events-(7:25)',
  //     'title': 'Input, "template reference variables", keyboard events (7:25)',
  //     'time': '7:25',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775043'
  //   },
  //   {
  //     'id': 73,
  //     'course': 'Angular',
  //     'idCategory': 11,
  //     'category': 'Template-driven Form',
  //     'slug': 'la-direttiva-ngmodel:-1way-vs-2-way-binding-(5:49)',
  //     'title': 'La direttiva ngModel: 1way vs 2 way binding (5:49)',
  //     'time': '5:49',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775050'
  //   },
  //   {
  //     'id': 74,
  //     'course': 'Angular',
  //     'idCategory': 11,
  //     'category': 'Template-driven Form',
  //     'slug': 'ngform,-ngmodel-e-gestione-data-model-(13:50)',
  //     'title': 'ngForm, ngModel e gestione data model (13:50)',
  //     'time': '13:50',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775060'
  //   },
  //   {
  //     'id': 75,
  //     'course': 'Angular',
  //     'idCategory': 11,
  //     'category': 'Template-driven Form',
  //     'slug': 'form-validation-(8:19)',
  //     'title': 'Form Validation (8:19)',
  //     'time': '8:19',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775069'
  //   },
  //   {
  //     'id': 76,
  //     'course': 'Angular',
  //     'idCategory': 11,
  //     'category': 'Template-driven Form',
  //     'slug': 'form,-validazione-e-gestione-errori-(4:09)',
  //     'title': 'Form, validazione e gestione errori (4:09)',
  //     'time': '4:09',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6775087'
  //   },
  //   {
  //     'id': 77,
  //     'course': 'Angular',
  //     'idCategory': 12,
  //     'category': 'Custom components',
  //     'slug': 'hello-components-(5:52)',
  //     'title': 'Hello Components (5:52)',
  //     'time': '5:52',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776260'
  //   },
  //   {
  //     'id': 78,
  //     'course': 'Angular',
  //     'idCategory': 12,
  //     'category': 'Custom components',
  //     'slug': 'input-properties-(2:32)',
  //     'title': 'Input Properties (2:32)',
  //     'time': '2:32',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776309'
  //   },
  //   {
  //     'id': 79,
  //     'course': 'Angular',
  //     'idCategory': 12,
  //     'category': 'Custom components',
  //     'slug': 'content-projection-(7:35)',
  //     'title': 'Content Projection (7:35)',
  //     'time': '7:35',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776338'
  //   },
  //   {
  //     'id': 80,
  //     'course': 'Angular',
  //     'idCategory': 12,
  //     'category': 'Custom components',
  //     'slug': 'componenti-"stateful"-e-input-default-value-(2:32)',
  //     'title': 'Componenti "stateful" e Input default value (2:32)',
  //     'time': '2:32',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8488630'
  //   },
  //   {
  //     'id': 81,
  //     'course': 'Angular',
  //     'idCategory': 12,
  //     'category': 'Custom components',
  //     'slug': '@output-event-emitter:-realizzare-un-tabbar-component-riutilizzabile-(24:10)',
  //     'title': '@Output event emitter: realizzare un TabBar component riutilizzabile (24:10)',
  //     'time': '24:10',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6788992'
  //   },
  //   {
  //     'id': 82,
  //     'course': 'Angular',
  //     'idCategory': 12,
  //     'category': 'Custom components',
  //     'slug': 'lifecycle-hook:-ngoninit-(9:23)',
  //     'title': 'Lifecycle hook: ngOnInit (9:23)',
  //     'time': '9:23',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6821010'
  //   },
  //   {
  //     'id': 83,
  //     'course': 'Angular',
  //     'idCategory': 12,
  //     'category': 'Custom components',
  //     'slug': 'lifecycle-hook:-onchange-(5:20)',
  //     'title': 'Lifecycle Hook: onChange (5:20)',
  //     'time': '5:20',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6821012'
  //   },
  //   {
  //     'id': 84,
  //     'course': 'Angular',
  //     'idCategory': 12,
  //     'category': 'Custom components',
  //     'slug': 'changedetectionstrategy,-changedetectorref-e-stato-immutabile:-ottimizzazione-performance-e-controllo-del-rendering-(14:45)',
  //     'title': 'ChangeDetectionStrategy, ChangeDetectorRef e stato immutabile: ottimizzazione performance e controllo del rendering (14:45)',
  //     'time': '14:45',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6839347'
  //   },
  //   {
  //     'id': 85,
  //     'course': 'Angular',
  //     'idCategory': 13,
  //     'category': 'BrowserAnimationModule: animazioni in Angular',
  //     'slug': 'animated-collapsable-panel:-trigger,-style,-state-e-animate-(11:37)',
  //     'title': 'Animated Collapsable Panel: trigger, style, state e animate (11:37)',
  //     'time': '11:37',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8430354'
  //   },
  //   {
  //     'id': 86,
  //     'course': 'Angular',
  //     'idCategory': 13,
  //     'category': 'BrowserAnimationModule: animazioni in Angular',
  //     'slug': 'animated-tabbar:-animations-e-ciclo-di-vita-dei-componenti-(15:58)',
  //     'title': 'Animated TabBar: animations e ciclo di vita dei componenti (15:58)',
  //     'time': '15:58',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8430359'
  //   },
  //   {
  //     'id': 87,
  //     'course': 'Angular',
  //     'idCategory': 13,
  //     'category': 'BrowserAnimationModule: animazioni in Angular',
  //     'slug': 'animated-text:-gestire-gli-eventi-delle-animation-(14:02)',
  //     'title': 'Animated Text: gestire gli eventi delle animation (14:02)',
  //     'time': '14:02',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8430366'
  //   },
  //   {
  //     'id': 88,
  //     'course': 'Angular',
  //     'idCategory': 14,
  //     'category': 'Multi-view applications con Angular Router',
  //     'slug': 'introduzione-ad-angular-router-(2:03)',
  //     'title': 'Introduzione ad angular router (2:03)',
  //     'time': '2:03',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6782691'
  //   },
  //   {
  //     'id': 89,
  //     'course': 'Angular',
  //     'idCategory': 14,
  //     'category': 'Multi-view applications con Angular Router',
  //     'slug': 'utilizzo-di-angular-router-e-creazione-componenti-con-angular-cli-(6:15)',
  //     'title': 'Utilizzo di Angular Router e creazione componenti con Angular CLI (6:15)',
  //     'time': '6:15',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776409'
  //   },
  //   {
  //     'id': 90,
  //     'course': 'Angular',
  //     'idCategory': 14,
  //     'category': 'Multi-view applications con Angular Router',
  //     'slug': 'navigation-bar-(5:33)',
  //     'title': 'Navigation Bar (5:33)',
  //     'time': '5:33',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776413'
  //   },
  //   {
  //     'id': 91,
  //     'course': 'Angular',
  //     'idCategory': 14,
  //     'category': 'Multi-view applications con Angular Router',
  //     'slug': 'angularcli-ei-il-modulo-approutingmodule-(5:13)',
  //     'title': 'AngularCLI ei il modulo AppRoutingModule (5:13)',
  //     'time': '5:13',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6952522'
  //   },
  //   {
  //     'id': 92,
  //     'course': 'Angular',
  //     'idCategory': 14,
  //     'category': 'Multi-view applications con Angular Router',
  //     'slug': 'passaggio-parametri-e-activatedroute-(8:30)',
  //     'title': 'Passaggio parametri e ActivatedRoute (8:30)',
  //     'time': '8:30',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6796003'
  //   },
  //   {
  //     'id': 93,
  //     'course': 'Angular',
  //     'idCategory': 14,
  //     'category': 'Multi-view applications con Angular Router',
  //     'slug': 'activatedroute-e-router-api-(6:23)',
  //     'title': 'ActivatedRoute e Router API (6:23)',
  //     'time': '6:23',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6796006'
  //   },
  //   {
  //     'id': 94,
  //     'course': 'Angular',
  //     'idCategory': 14,
  //     'category': 'Multi-view applications con Angular Router',
  //     'slug': 'eventi-del-router-&-rxjs-operators-(4:50)',
  //     'title': 'Eventi del router & RxJS operators (4:50)',
  //     'time': '4:50',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6796007'
  //   },
  //   {
  //     'id': 95,
  //     'course': 'Angular',
  //     'idCategory': 15,
  //     'category': 'Comunicazione con il server',
  //     'slug': 'configurare-un-mock-server:-json-server-(5:13)',
  //     'title': 'Configurare un mock server: json-server (5:13)',
  //     'time': '5:13',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776551'
  //   },
  //   {
  //     'id': 96,
  //     'course': 'Angular',
  //     'idCategory': 15,
  //     'category': 'Comunicazione con il server',
  //     'slug': 'get:-caricamento-dati-da-rest-api-e-custom-types-(9:30)',
  //     'title': 'GET: Caricamento dati da REST API e custom types (9:30)',
  //     'time': '9:30',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776571'
  //   },
  //   {
  //     'id': 97,
  //     'course': 'Angular',
  //     'idCategory': 15,
  //     'category': 'Comunicazione con il server',
  //     'slug': 'delete:-cancellazione-elementi-e-gestione-errori-xhr-(8:39)',
  //     'title': 'DELETE: Cancellazione elementi e gestione errori XHR (8:39)',
  //     'time': '8:39',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776604'
  //   },
  //   {
  //     'id': 98,
  //     'course': 'Angular',
  //     'idCategory': 15,
  //     'category': 'Comunicazione con il server',
  //     'slug': 'dynamic-styles-e-migliorare-il-look-&-feel-(7:45)',
  //     'title': 'Dynamic styles e migliorare il look & feel (7:45)',
  //     'time': '7:45',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776694'
  //   },
  //   {
  //     'id': 99,
  //     'course': 'Angular',
  //     'idCategory': 15,
  //     'category': 'Comunicazione con il server',
  //     'slug': 'post:-aggiungere-elementi-alla-collezione-tramite-form-(9:55)',
  //     'title': 'POST: Aggiungere elementi alla collezione tramite form (9:55)',
  //     'time': '9:55',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776609'
  //   },
  //   {
  //     'id': 100,
  //     'course': 'Angular',
  //     'idCategory': 15,
  //     'category': 'Comunicazione con il server',
  //     'slug': 'put-e-patch:-aggiornare-un-elemento-(13:34)',
  //     'title': 'PUT e PATCH: aggiornare un elemento (13:34)',
  //     'time': '13:34',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6776702'
  //   },
  //   {
  //     'id': 101,
  //     'course': 'Angular',
  //     'idCategory': 16,
  //     'category': 'Dependency Injection',
  //     'slug': 'dependency-injection,-injector-e-providers-(6:01)',
  //     'title': 'Dependency Injection, injector e providers (6:01)',
  //     'time': '6:01',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6782564'
  //   },
  //   {
  //     'id': 102,
  //     'course': 'Angular',
  //     'idCategory': 16,
  //     'category': 'Dependency Injection',
  //     'slug': 'condividere-dati-utilizzando-i-"service"-(8:43)',
  //     'title': 'Condividere dati utilizzando i "Service" (8:43)',
  //     'time': '8:43',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6782552'
  //   },
  //   {
  //     'id': 103,
  //     'course': 'Angular',
  //     'idCategory': 16,
  //     'category': 'Dependency Injection',
  //     'slug': 'service,-rest-api-e-decoratore-@injectable-(10:57)',
  //     'title': 'Service, REST API e decoratore @injectable (10:57)',
  //     'time': '10:57',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6782557'
  //   },
  //   {
  //     'id': 104,
  //     'course': 'Angular',
  //     'idCategory': 16,
  //     'category': 'Dependency Injection',
  //     'slug': 'gestire-lo-stato-applicativo-(5:49)',
  //     'title': 'Gestire lo stato applicativo (5:49)',
  //     'time': '5:49',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6782558'
  //   },
  //   {
  //     'id': 105,
  //     'course': 'Angular',
  //     'idCategory': 17,
  //     'category': 'Applicazioni modulari, approfondimento router e lazy loading',
  //     'slug': 'moduli:-introduzione-(8:23)',
  //     'title': 'Moduli: introduzione (8:23)',
  //     'time': '8:23',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8632150'
  //   },
  //   {
  //     'id': 106,
  //     'course': 'Angular',
  //     'idCategory': 17,
  //     'category': 'Applicazioni modulari, approfondimento router e lazy loading',
  //     'slug': 'applicazioni-modulari-(5:38)',
  //     'title': 'Applicazioni Modulari (5:38)',
  //     'time': '5:38',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622526'
  //   },
  //   {
  //     'id': 107,
  //     'course': 'Angular',
  //     'idCategory': 17,
  //     'category': 'Applicazioni modulari, approfondimento router e lazy loading',
  //     'slug': 'es6-modules-vs-ngmodules-(2:21)',
  //     'title': 'es6 modules vs ngModules (2:21)',
  //     'time': '2:21',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8625952'
  //   },
  //   {
  //     'id': 108,
  //     'course': 'Angular',
  //     'idCategory': 17,
  //     'category': 'Applicazioni modulari, approfondimento router e lazy loading',
  //     'slug': 'feature-modules-(10:12)',
  //     'title': 'Feature Modules (10:12)',
  //     'time': '10:12',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622208'
  //   },
  //   {
  //     'id': 109,
  //     'course': 'Angular',
  //     'idCategory': 17,
  //     'category': 'Applicazioni modulari, approfondimento router e lazy loading',
  //     'slug': 'shared-modules-(11:25)',
  //     'title': 'Shared Modules (11:25)',
  //     'time': '11:25',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622200'
  //   },
  //   {
  //     'id': 110,
  //     'course': 'Angular',
  //     'idCategory': 17,
  //     'category': 'Applicazioni modulari, approfondimento router e lazy loading',
  //     'slug': 'core-module-(3:56)',
  //     'title': 'Core Module (3:56)',
  //     'time': '3:56',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622207'
  //   },
  //   {
  //     'id': 111,
  //     'course': 'Angular',
  //     'idCategory': 17,
  //     'category': 'Applicazioni modulari, approfondimento router e lazy loading',
  //     'slug': 'update-angular-9:-nuova-sintassi-per-gli-import-lazy-dei-moduli',
  //     'title': 'UPDATE Angular 9: nuova sintassi per gli import lazy dei moduli',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/15266073'
  //   },
  //   {
  //     'id': 112,
  //     'course': 'Angular',
  //     'idCategory': 17,
  //     'category': 'Applicazioni modulari, approfondimento router e lazy loading',
  //     'slug': 'router-&-lazy-loading-(11:56)',
  //     'title': 'Router & Lazy Loading (11:56)',
  //     'time': '11:56',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622211'
  //   },
  //   {
  //     'id': 113,
  //     'course': 'Angular',
  //     'idCategory': 17,
  //     'category': 'Applicazioni modulari, approfondimento router e lazy loading',
  //     'slug': 'moduli-e-route-di-secondo-livello-(5:54)',
  //     'title': 'Moduli e route di secondo livello (5:54)',
  //     'time': '5:54',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8632770'
  //   },
  //   {
  //     'id': 114,
  //     'course': 'Angular',
  //     'idCategory': 17,
  //     'category': 'Applicazioni modulari, approfondimento router e lazy loading',
  //     'slug': 'router-children-e-router-outlet-secondario-(5:34)',
  //     'title': 'Router children e router-outlet secondario (5:34)',
  //     'time': '5:34',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8632812'
  //   },
  //   {
  //     'id': 115,
  //     'course': 'Angular',
  //     'idCategory': 17,
  //     'category': 'Applicazioni modulari, approfondimento router e lazy loading',
  //     'slug': 'update-angular-8/9:-lazy-loading-&-dynamic-imports-(3:41)',
  //     'title': 'UPDATE ANGULAR 8/9: lazy loading & dynamic imports (3:41)',
  //     'time': '3:41',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/10452670'
  //   },
  //   {
  //     'id': 116,
  //     'course': 'Angular',
  //     'idCategory': 18,
  //     'category': 'Build & Deploy',
  //     'slug': 'creare-la-build-del-progetto-e-installare-un-webserver-locale-(3:09)',
  //     'title': 'Creare la build del progetto e installare un webserver locale (3:09)',
  //     'time': '3:09',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6782569'
  //   },
  //   {
  //     'id': 117,
  //     'course': 'Angular',
  //     'idCategory': 18,
  //     'category': 'Build & Deploy',
  //     'slug': 'ottimizzazione-build,-production-e-tree-shaking-(2:41)',
  //     'title': 'Ottimizzazione build, production e tree shaking (2:41)',
  //     'time': '2:41',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6844488'
  //   },
  //   {
  //     'id': 118,
  //     'course': 'Angular',
  //     'idCategory': 18,
  //     'category': 'Build & Deploy',
  //     'slug': 'deploy-delle-applicazioni-su-surge.sh-(2:37)',
  //     'title': 'Deploy delle applicazioni su Surge.sh (2:37)',
  //     'time': '2:37',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6782573'
  //   },
  //   {
  //     'id': 119,
  //     'course': 'Angular',
  //     'idCategory': 18,
  //     'category': 'Build & Deploy',
  //     'slug': 'pubblicare-un\'applicazione-angular-su-surge.sh-(0:54)',
  //     'title': 'Pubblicare un\'applicazione Angular su Surge.sh (0:54)',
  //     'time': '0:54',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6844492'
  //   },
  //   {
  //     'id': 120,
  //     'course': 'Angular',
  //     'idCategory': 18,
  //     'category': 'Build & Deploy',
  //     'slug': 'environment-variables:-production-vs-development-(5:44)',
  //     'title': 'environment variables: production vs development (5:44)',
  //     'time': '5:44',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6782567'
  //   },
  //   {
  //     'id': 121,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'video-demo-dell\'applicazione-(0:20)',
  //     'title': 'Video demo dell\'applicazione (0:20)',
  //     'time': '0:20',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8463126'
  //   },
  //   {
  //     'id': 122,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'parte-1:-sviluppo-applicazione',
  //     'title': 'PARTE 1: SVILUPPO APPLICAZIONE',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622514'
  //   },
  //   {
  //     'id': 123,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'layout-statico-html-con-css-grid-(+-source-code)-(8:37)',
  //     'title': 'Layout statico HTML con CSS Grid (+ source code) (8:37)',
  //     'time': '8:37',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8467513'
  //   },
  //   {
  //     'id': 124,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'creazione-progetto,-gestione-router-e-impaginazione-layout-(11:36)',
  //     'title': 'Creazione progetto, gestione router e impaginazione layout (11:36)',
  //     'time': '11:36',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8467516'
  //   },
  //   {
  //     'id': 125,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'server-rest,-comunicazione-server,-model,-gestione-form-e-visualizzazione-risultati-(23:21)',
  //     'title': 'Server REST, comunicazione server, model, gestione form e visualizzazione risultati (23:21)',
  //     'time': '23:21',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8467523'
  //   },
  //   {
  //     'id': 126,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'card-component-e-pipe:-image-gallery,-forms,-maps,-rate,-...-(34:35)',
  //     'title': 'Card component e pipe: image gallery, forms, maps, rate, ... (34:35)',
  //     'time': '34:35',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8467515'
  //   },
  //   {
  //     'id': 127,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'gestione-del-carrello-(19:26)',
  //     'title': 'Gestione del carrello (19:26)',
  //     'time': '19:26',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8467522'
  //   },
  //   {
  //     'id': 128,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'autenticazione,-"sicurezza"-router-utilizzando-le-guardie-e-protezione-dom-(25:59)',
  //     'title': 'Autenticazione, "sicurezza" router utilizzando le guardie e protezione DOM (25:59)',
  //     'time': '25:59',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8468138'
  //   },
  //   {
  //     'id': 129,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'parte-2:-approccio-component-based',
  //     'title': 'PARTE 2: APPROCCIO COMPONENT-BASED',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622515'
  //   },
  //   {
  //     'id': 130,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'approccio-component-based---part-1:-hotel-form,-hotel-list-e-shared-components-(16:42)',
  //     'title': 'Approccio component-based - PART 1: hotel-form, hotel-list e shared components (16:42)',
  //     'time': '16:42',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8482231'
  //   },
  //   {
  //     'id': 131,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'approccio-component-based---part-2:-i-componenti-rimanenti-(16:57)',
  //     'title': 'Approccio component-based - PART 2: i componenti rimanenti (16:57)',
  //     'time': '16:57',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8508416'
  //   },
  //   {
  //     'id': 132,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'approccio-component-based---part-3:-card-component-flessibile-e-riutilizzabile-(hostbinding)-(17:02)',
  //     'title': 'Approccio component-based - PART 3: card component flessibile e riutilizzabile (HostBinding) (17:02)',
  //     'time': '17:02',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8508418'
  //   },
  //   {
  //     'id': 133,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'gestire-il-caso-in-cui-il-risultato-della-ricerca-non-produca-risultati-(4:08)',
  //     'title': 'Gestire il caso in cui il risultato della ricerca non produca risultati (4:08)',
  //     'time': '4:08',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8560573'
  //   },
  //   {
  //     'id': 134,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'parte-3:-moduli-e-lazy-loading',
  //     'title': 'PARTE 3: MODULI e LAZY LOADING',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622517'
  //   },
  //   {
  //     'id': 135,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'shared-module-(5:57)',
  //     'title': 'Shared Module (5:57)',
  //     'time': '5:57',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622521'
  //   },
  //   {
  //     'id': 136,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'core-module-(5:34)',
  //     'title': 'Core Module (5:34)',
  //     'time': '5:34',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622520'
  //   },
  //   {
  //     'id': 137,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'features-modules-(6:19)',
  //     'title': 'Features Modules (6:19)',
  //     'time': '6:19',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622522'
  //   },
  //   {
  //     'id': 138,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'update-angular-9:-leggere',
  //     'title': 'UPDATE Angular 9: leggere',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/15517869'
  //   },
  //   {
  //     'id': 139,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'router-&-lazy-loading-(21:06)',
  //     'title': 'Router & Lazy Loading (21:06)',
  //     'time': '21:06',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8622228'
  //   },
  //   {
  //     'id': 140,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'note-finali',
  //     'title': 'NOTE FINALI',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/15518066'
  //   },
  //   {
  //     'id': 141,
  //     'course': 'Angular',
  //     'idCategory': 19,
  //     'category': 'Live Coding / SPA: Hotel-Booking App',
  //     'slug': 'download-source-code',
  //     'title': 'Download Source Code',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8891997'
  //   },
  //   {
  //     'id': 142,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'demo-dell\'applicazione-(0:11)',
  //     'title': 'Demo dell\'applicazione (0:11)',
  //     'time': '0:11',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6788997'
  //   },
  //   {
  //     'id': 143,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'creazione-progetto,-tslint,-installazione-dipendenze-e-mock-server-(9:46)',
  //     'title': 'Creazione progetto, TSLint, installazione dipendenze e Mock Server (9:46)',
  //     'time': '9:46',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6801508'
  //   },
  //   {
  //     'id': 144,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'creare-"features-components"-da-angular-cli-e-gestione-router-(4:04)',
  //     'title': 'Creare "features components" da Angular-CLI e gestione router (4:04)',
  //     'time': '4:04',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6801527'
  //   },
  //   {
  //     'id': 145,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'get-e-delete:-visualizzazione-e-cancellazione-dati-dal-server-(7:40)',
  //     'title': 'GET e DELETE: visualizzazione e cancellazione dati dal server (7:40)',
  //     'time': '7:40',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6801529'
  //   },
  //   {
  //     'id': 146,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'put,-patch-e-post:-modifica-e-inserimento-dati-(17:34)',
  //     'title': 'PUT, PATCH e POST: modifica e inserimento dati (17:34)',
  //     'time': '17:34',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6801540'
  //   },
  //   {
  //     'id': 147,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'download-source-code',
  //     'title': 'Download Source Code',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8892455'
  //   },
  //   {
  //     'id': 148,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'organizzare-il-layout-in-componenti:-cataloglist-(8:05)',
  //     'title': 'Organizzare il layout in componenti: CatalogList (8:05)',
  //     'time': '8:05',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6788999'
  //   },
  //   {
  //     'id': 149,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'organizzare-il-layout-in-componenti:-catalogform-(14:20)',
  //     'title': 'Organizzare il layout in componenti: CatalogForm (14:20)',
  //     'time': '14:20',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6823977'
  //   },
  //   {
  //     'id': 150,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'metodo-onchanges-del-ciclo-di-vita-dei-componenti-e-decoratore-@viewchild-(9:17)',
  //     'title': 'Metodo onChanges del ciclo di vita dei componenti e decoratore @ViewChild (9:17)',
  //     'time': '9:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6821476'
  //   },
  //   {
  //     'id': 151,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'download-source-code',
  //     'title': 'Download Source Code',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8892452'
  //   },
  //   {
  //     'id': 152,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'organizzazione-dell\'applicazione-in-services-(5:36)',
  //     'title': 'Organizzazione dell\'applicazione in services (5:36)',
  //     'time': '5:36',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6821023'
  //   },
  //   {
  //     'id': 153,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'gestire-lo-stato-applicativo-(8:18)',
  //     'title': 'Gestire lo stato applicativo (8:18)',
  //     'time': '8:18',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6782559'
  //   },
  //   {
  //     'id': 154,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'download-source-code',
  //     'title': 'Download Source Code',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8892484'
  //   },
  //   {
  //     'id': 155,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'nested-components:-componenti-dentro-componenti-(5:12)',
  //     'title': 'Nested Components: componenti dentro componenti (5:12)',
  //     'time': '5:12',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6825072'
  //   },
  //   {
  //     'id': 156,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'shared-components:-componenti-riutilizzabili-(9:35)',
  //     'title': 'Shared components: componenti riutilizzabili (9:35)',
  //     'time': '9:35',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6821154'
  //   },
  //   {
  //     'id': 157,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'core-components:-navigation-bar-e-router-(4:17)',
  //     'title': 'Core Components: Navigation bar e router (4:17)',
  //     'time': '4:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6821152'
  //   },
  //   {
  //     'id': 158,
  //     'course': 'Angular',
  //     'idCategory': 20,
  //     'category': 'Live Coding / Crud APP: approccio component-based, gestione stato & Best Practices',
  //     'slug': 'download-source-code',
  //     'title': 'Download Source Code',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8892523'
  //   },
  //   {
  //     'id': 159,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'demo-dell\'applicazione-"remote-controller"-(0:18)',
  //     'title': 'Demo dell\'applicazione "remote controller" (0:18)',
  //     'time': '0:18',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6952824'
  //   },
  //   {
  //     'id': 160,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'creazione-progetto-con-router-(3:24)',
  //     'title': 'Creazione progetto con router (3:24)',
  //     'time': '3:24',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8437825'
  //   },
  //   {
  //     'id': 161,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'admin:-creazione-layout-statico---html-+-css-(16:21)',
  //     'title': 'ADMIN: Creazione layout statico - HTML + CSS (16:21)',
  //     'time': '16:21',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8438516'
  //   },
  //   {
  //     'id': 162,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'viewer:-creazione-layout-statico---html-+-css-(1:48)',
  //     'title': 'VIEWER: Creazione layout statico - HTML + CSS (1:48)',
  //     'time': '1:48',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8438529'
  //   },
  //   {
  //     'id': 163,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'introduzione-a-firebase-(3:22)',
  //     'title': 'Introduzione a Firebase (3:22)',
  //     'time': '3:22',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6930076'
  //   },
  //   {
  //     'id': 164,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'angularfire:-installazione-e-configurazione-(4:09)',
  //     'title': 'AngularFire: installazione e configurazione (4:09)',
  //     'time': '4:09',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6930093'
  //   },
  //   {
  //     'id': 165,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'controller:-creazione-della-galleria-immagini-realtime-in-firebase-(19:31)',
  //     'title': 'CONTROLLER: Creazione della galleria immagini realtime in Firebase (19:31)',
  //     'time': '19:31',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6930096'
  //   },
  //   {
  //     'id': 166,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'controller:-controllare-le-slide-(7:24)',
  //     'title': 'CONTROLLER: controllare le slide (7:24)',
  //     'time': '7:24',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6930086'
  //   },
  //   {
  //     'id': 167,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'viewer:-visualizzazione-delle-immagini-realtime-(3:05)',
  //     'title': 'VIEWER: visualizzazione delle immagini realtime (3:05)',
  //     'time': '3:05',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6930089'
  //   },
  //   {
  //     'id': 168,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'viewer:-bug-fix-(9:29)',
  //     'title': 'VIEWER: bug fix (9:29)',
  //     'time': '9:29',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6930091'
  //   },
  //   {
  //     'id': 169,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'viewer:-aggiungere-le-animazioni-(8:44)',
  //     'title': 'VIEWER: aggiungere le animazioni (8:44)',
  //     'time': '8:44',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6930087'
  //   },
  //   {
  //     'id': 170,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'viewer:-animation-bug-fix',
  //     'title': 'VIEWER: animation bug fix',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8697873'
  //   },
  //   {
  //     'id': 171,
  //     'course': 'Angular',
  //     'idCategory': 21,
  //     'category': 'Live Coding / REALTIME APP con Firebase : creare un remote controller per controllare un viewer di slides',
  //     'slug': 'testare-l\'applicazione-da-un-dispositivo-mobile-tramite-rete-locale-durante-lo-sviluppo:-ng-serve---host-(1:19)',
  //     'title': 'Testare l\'applicazione da un dispositivo mobile tramite rete locale durante lo sviluppo: ng serve --host (1:19)',
  //     'time': '1:19',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/6938376'
  //   },
  //   {
  //     'id': 172,
  //     'course': 'Angular',
  //     'idCategory': 22,
  //     'category': 'Extra',
  //     'slug': 'stackblitz:-editor-online-per-condividere-snippet-(3:34)',
  //     'title': 'StackBlitz: editor online per condividere snippet (3:34)',
  //     'time': '3:34',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/8682631'
  //   },
  //   {
  //     'id': 173,
  //     'course': 'Angular',
  //     'idCategory': 22,
  //     'category': 'Extra',
  //     'slug': 'introduzione-ai-reactive-forms---video-di-test-del-talk-@-codemotion-2019-(40:53)',
  //     'title': 'Introduzione ai Reactive Forms - Video di test del talk @ Codemotion 2019 (40:53)',
  //     'time': '40:53',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/9648850'
  //   },
  //   {
  //     'id': 174,
  //     'course': 'Angular',
  //     'idCategory': 22,
  //     'category': 'Extra',
  //     'slug': 'panoramica-su-typescript-3.7-&-utility-types-(14:06)',
  //     'title': 'Panoramica su Typescript 3.7 & Utility Types (14:06)',
  //     'time': '14:06',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/13688049'
  //   },
  //   {
  //     'id': 175,
  //     'course': 'Angular',
  //     'idCategory': 22,
  //     'category': 'Extra',
  //     'slug': 'ivy-&-angular-9:-dynamic-imports-and-lazy-loading-per-componenti-e-moduli-(21:29)',
  //     'title': 'IVY & Angular 9: dynamic Imports and lazy loading per componenti e moduli (21:29)',
  //     'time': '21:29',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/10452668'
  //   },
  //   {
  //     'id': 176,
  //     'course': 'Angular',
  //     'idCategory': 22,
  //     'category': 'Extra',
  //     'slug': 'tip-per-configurare-visualstudio-code-&-migliorare-gli-auto-import-(5:02)',
  //     'title': 'Tip per configurare VisualStudio Code & migliorare gli Auto Import (5:02)',
  //     'time': '5:02',
  //     'url': 'https://fabiobiondi.teachable.com/courses/441059/lectures/14048943'
  //   },
  //   {
  //     'id': 177,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'introduzione-prima-parte-del-corso-su-rxjs-(teoria---articolo)',
  //     'title': 'Introduzione prima parte del corso su RxJS (teoria - articolo)',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065996'
  //   },
  //   {
  //     'id': 178,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'premessa-(teoria---video)-(1:14)',
  //     'title': 'Premessa (teoria - video) (1:14)',
  //     'time': '1:14',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065997'
  //   },
  //   {
  //     'id': 179,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'introduzione-a-rxjs-(3:10)',
  //     'title': 'Introduzione a RxJS (3:10)',
  //     'time': '3:10',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065998'
  //   },
  //   {
  //     'id': 180,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'imperative-vs-reactive-programming-(9:25)',
  //     'title': 'Imperative vs Reactive Programming (9:25)',
  //     'time': '9:25',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065999'
  //   },
  //   {
  //     'id': 181,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'rxjs-is-smart:-preview-operatori-throttletime-&-scan-(2:41)',
  //     'title': 'RxJS is smart: preview operatori throttleTime & scan (2:41)',
  //     'time': '2:41',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12066000'
  //   },
  //   {
  //     'id': 182,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'pull-vs-push-(8:08)',
  //     'title': 'Pull vs Push (8:08)',
  //     'time': '8:08',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12066001'
  //   },
  //   {
  //     'id': 183,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'next",-"error"-e-"complete"-functions-(5:07)',
  //     'title': 'next", "error" e "complete" functions (5:07)',
  //     'time': '5:07',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12066002'
  //   },
  //   {
  //     'id': 184,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'subscription-e-unsubscribe-(4:56)',
  //     'title': 'Subscription e unsubscribe (4:56)',
  //     'time': '4:56',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12066003'
  //   },
  //   {
  //     'id': 185,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'operatori-di-creazione-(6:07)',
  //     'title': 'Operatori-di-creazione (6:07)',
  //     'time': '6:07',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12066004'
  //   },
  //   {
  //     'id': 186,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'pipeable-operators-(5:01)',
  //     'title': 'Pipeable operators (5:01)',
  //     'time': '5:01',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12066005'
  //   },
  //   {
  //     'id': 187,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'debug-and-tap-operator-(4:58)',
  //     'title': 'Debug and tap operator (4:58)',
  //     'time': '4:58',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12066006'
  //   },
  //   {
  //     'id': 188,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'comprendere-i-marble-diagrams-(3:41)',
  //     'title': 'Comprendere i marble diagrams (3:41)',
  //     'time': '3:41',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12066007'
  //   },
  //   {
  //     'id': 189,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'tutti-gli-esempi-del-capitolo-su-stackblitz',
  //     'title': 'Tutti gli esempi del capitolo su StackBlitz',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12066008'
  //   },
  //   {
  //     'id': 190,
  //     'course': 'RxJs',
  //     'idCategory': 23,
  //     'category': 'Introduzione a RxJS',
  //     'slug': 'come-utilizzare-stackblitz-(3:34)',
  //     'title': 'Come utilizzare StackBlitz (3:34)',
  //     'time': '3:34',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12066009'
  //   },
  //   {
  //     'id': 191,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'intro-capitolo-(teoria---articolo)',
  //     'title': 'Intro Capitolo (teoria - articolo)',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065760'
  //   },
  //   {
  //     'id': 192,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'operatore-"map"-(5:03)',
  //     'title': 'Operatore "map" (5:03)',
  //     'time': '5:03',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065761'
  //   },
  //   {
  //     'id': 193,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'angular-"async"-pipe-(6:08)',
  //     'title': 'Angular "async" pipe (6:08)',
  //     'time': '6:08',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065762'
  //   },
  //   {
  //     'id': 194,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'operatore-"forkjoin"-(5:15)',
  //     'title': 'Operatore "forkJoin" (5:15)',
  //     'time': '5:15',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065763'
  //   },
  //   {
  //     'id': 195,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'operatore-"forkjoin"-con-dictionary-(update-rxjs-6.4)',
  //     'title': 'Operatore "ForkJoin" con dictionary (update RxJS 6.4)',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065764'
  //   },
  //   {
  //     'id': 196,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'operatore-"combinelatest"-(articolo)',
  //     'title': 'Operatore "combineLatest" (articolo)',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065765'
  //   },
  //   {
  //     'id': 197,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'operatore-"switchmap":-nested-xhr-(4:07)',
  //     'title': 'Operatore "switchMap": nested XHR (4:07)',
  //     'time': '4:07',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065766'
  //   },
  //   {
  //     'id': 198,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'operatore-"switchmap"-per-iterare-sugli-array-(3:01)',
  //     'title': 'Operatore "switchMap" per iterare sugli array (3:01)',
  //     'time': '3:01',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065767'
  //   },
  //   {
  //     'id': 199,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'operatore-"retry"-e-gestione-errori-con-l\'operatore-"catcherror"-(6:38)',
  //     'title': 'Operatore "retry" e gestione errori con l\'operatore "catchError" (6:38)',
  //     'time': '6:38',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065768'
  //   },
  //   {
  //     'id': 200,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'operatori-"reduce"-e-"scan"-(6:00)',
  //     'title': 'Operatori "reduce" e "scan" (6:00)',
  //     'time': '6:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065769'
  //   },
  //   {
  //     'id': 201,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'switchmap"-vs-"exhaustmap"-(6:14)',
  //     'title': 'switchmap" vs "exhaustmap" (6:14)',
  //     'time': '6:14',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065770'
  //   },
  //   {
  //     'id': 202,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'switchmap"-vs-"concatmap"-vs-"mergemap"-vs-"exhaustmap"-(4:00)',
  //     'title': 'switchmap" vs "concatmap" vs "mergemap" vs "exhaustmap" (4:00)',
  //     'time': '4:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065771'
  //   },
  //   {
  //     'id': 203,
  //     'course': 'RxJs',
  //     'idCategory': 24,
  //     'category': 'RxJS & Angular: esempi pratici e casi d\'uso per la comunicazione con il server',
  //     'slug': 'esercizio-online-su-switchmap',
  //     'title': 'Esercizio online su switchMap',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065772'
  //   },
  //   {
  //     'id': 204,
  //     'course': 'RxJs',
  //     'idCategory': 25,
  //     'category': 'RxJS: advanced topics',
  //     'slug': 'operatore-defer():-lazy-observables-(5:04)',
  //     'title': 'Operatore defer(): lazy observables (5:04)',
  //     'time': '5:04',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065758'
  //   },
  //   {
  //     'id': 205,
  //     'course': 'RxJs',
  //     'idCategory': 25,
  //     'category': 'RxJS: advanced topics',
  //     'slug': 'creazione-operatori-custom-rxjs-(5:50)',
  //     'title': 'Creazione Operatori Custom RXJS (5:50)',
  //     'time': '5:50',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065759'
  //   },
  //   {
  //     'id': 206,
  //     'course': 'RxJs',
  //     'idCategory': 26,
  //     'category': 'RxJS & Angular: autenticazione e sicurezza',
  //     'slug': 'cosa-sono-i-behaviorsubject-(articolo)',
  //     'title': 'Cosa sono i BehaviorSubject (articolo)',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065797'
  //   },
  //   {
  //     'id': 207,
  //     'course': 'RxJs',
  //     'idCategory': 26,
  //     'category': 'RxJS & Angular: autenticazione e sicurezza',
  //     'slug': 'introduzione-al-processo-di-autenticazione-in-single-page-applications-(teoria)-(6:51)',
  //     'title': 'introduzione al processo di autenticazione in Single Page Applications (TEORIA) (6:51)',
  //     'time': '6:51',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065798'
  //   },
  //   {
  //     'id': 208,
  //     'course': 'RxJs',
  //     'idCategory': 26,
  //     'category': 'RxJS & Angular: autenticazione e sicurezza',
  //     'slug': 'esercizio-online-su-behaviorsubject',
  //     'title': 'Esercizio online su BehaviorSubject',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065799'
  //   },
  //   {
  //     'id': 209,
  //     'course': 'RxJs',
  //     'idCategory': 26,
  //     'category': 'RxJS & Angular: autenticazione e sicurezza',
  //     'slug': 'login-e-behaviorsubject-(7:31)',
  //     'title': 'Login e BehaviorSubject (7:31)',
  //     'time': '7:31',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065800'
  //   },
  //   {
  //     'id': 210,
  //     'course': 'RxJs',
  //     'idCategory': 26,
  //     'category': 'RxJS & Angular: autenticazione e sicurezza',
  //     'slug': 'auth-guard-e-rxjs-(4:32)',
  //     'title': 'Auth-guard e RxJS (4:32)',
  //     'time': '4:32',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065801'
  //   },
  //   {
  //     'id': 211,
  //     'course': 'RxJs',
  //     'idCategory': 26,
  //     'category': 'RxJS & Angular: autenticazione e sicurezza',
  //     'slug': 'interceptor---part1:-subject-e-getvalue-(7:59)',
  //     'title': 'Interceptor - part1: Subject e getvalue (7:59)',
  //     'time': '7:59',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065802'
  //   },
  //   {
  //     'id': 212,
  //     'course': 'RxJs',
  //     'idCategory': 26,
  //     'category': 'RxJS & Angular: autenticazione e sicurezza',
  //     'slug': 'interceptor---part2:-approccio-idiomatico-(3:09)',
  //     'title': 'Interceptor - part2: approccio idiomatico (3:09)',
  //     'time': '3:09',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065803'
  //   },
  //   {
  //     'id': 213,
  //     'course': 'RxJs',
  //     'idCategory': 26,
  //     'category': 'RxJS & Angular: autenticazione e sicurezza',
  //     'slug': 'interceptor---part3:-gestione-errori-(6:13)',
  //     'title': 'Interceptor - part3: gestione errori (6:13)',
  //     'time': '6:13',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065804'
  //   },
  //   {
  //     'id': 214,
  //     'course': 'RxJs',
  //     'idCategory': 26,
  //     'category': 'RxJS & Angular: autenticazione e sicurezza',
  //     'slug': 'rxjs-&-router-events-(3:55)',
  //     'title': 'RxJS & Router Events (3:55)',
  //     'time': '3:55',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065805'
  //   },
  //   {
  //     'id': 215,
  //     'course': 'RxJs',
  //     'idCategory': 26,
  //     'category': 'RxJS & Angular: autenticazione e sicurezza',
  //     'slug': 'live-demo-e-source-code',
  //     'title': 'Live demo e source code',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065806'
  //   },
  //   {
  //     'id': 216,
  //     'course': 'RxJs',
  //     'idCategory': 27,
  //     'category': 'RxJS & Angular Reactive Forms',
  //     'slug': 'introduzione-al-capitolo-(teoria---articolo)',
  //     'title': 'Introduzione al capitolo (teoria - articolo)',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065787'
  //   },
  //   {
  //     'id': 217,
  //     'course': 'RxJs',
  //     'idCategory': 27,
  //     'category': 'RxJS & Angular Reactive Forms',
  //     'slug': 'reactive-forms-vs-template-driven-forms-(8:19)',
  //     'title': 'Reactive Forms vs Template Driven Forms (8:19)',
  //     'time': '8:19',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065788'
  //   },
  //   {
  //     'id': 218,
  //     'course': 'RxJs',
  //     'idCategory': 27,
  //     'category': 'RxJS & Angular Reactive Forms',
  //     'slug': 'i-moduli-reactiveformsmodule-e-httpclientmodule-(0:43)',
  //     'title': 'I moduli ReactiveFormsModule e HttpClientModule (0:43)',
  //     'time': '0:43',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065789'
  //   },
  //   {
  //     'id': 219,
  //     'course': 'RxJs',
  //     'idCategory': 27,
  //     'category': 'RxJS & Angular Reactive Forms',
  //     'slug': 'registra-il-tuo-token-su-openweathermap',
  //     'title': 'Registra il tuo token su OpenWeatherMap',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065790'
  //   },
  //   {
  //     'id': 220,
  //     'course': 'RxJs',
  //     'idCategory': 27,
  //     'category': 'RxJS & Angular Reactive Forms',
  //     'slug': 'multiple-subscribes-(bad-practice)-(4:51)',
  //     'title': 'Multiple Subscribes (Bad Practice) (4:51)',
  //     'time': '4:51',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065791'
  //   },
  //   {
  //     'id': 221,
  //     'course': 'RxJs',
  //     'idCategory': 27,
  //     'category': 'RxJS & Angular Reactive Forms',
  //     'slug': 'evitare-subscribe-multiple-con-"switchmap"-e-gestione-degli-errori-con-"catcherror"-(3:23)',
  //     'title': 'Evitare subscribe multiple con "switchMap" e gestione degli errori con "catchError" (3:23)',
  //     'time': '3:23',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065792'
  //   },
  //   {
  //     'id': 222,
  //     'course': 'RxJs',
  //     'idCategory': 27,
  //     'category': 'RxJS & Angular Reactive Forms',
  //     'slug': 'utilizzare-operatori-rxjs-con-i-reactive-form:-"startwith",-"distinctuntilchanged",-"decouncetime",-"filter"-(4:40)',
  //     'title': 'Utilizzare operatori RxJS con i reactive form: "startWith", "distinctUntilChanged", "decounceTime", "filter" (4:40)',
  //     'time': '4:40',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065793'
  //   },
  //   {
  //     'id': 223,
  //     'course': 'RxJs',
  //     'idCategory': 27,
  //     'category': 'RxJS & Angular Reactive Forms',
  //     'slug': 'l\'operatore-"withlatestfrom"-(7:25)',
  //     'title': 'L\'operatore "withLatestFrom" (7:25)',
  //     'time': '7:25',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065794'
  //   },
  //   {
  //     'id': 224,
  //     'course': 'RxJs',
  //     'idCategory': 27,
  //     'category': 'RxJS & Angular Reactive Forms',
  //     'slug': 'password-match:-"combinelatest"-e-formcontrol-(articolo)',
  //     'title': 'Password match: "combineLatest" e FormControl (articolo)',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065795'
  //   },
  //   {
  //     'id': 225,
  //     'course': 'RxJs',
  //     'idCategory': 27,
  //     'category': 'RxJS & Angular Reactive Forms',
  //     'slug': 'esercizio-su-formcontrol-e-combinelatest',
  //     'title': 'Esercizio su FormControl e combineLatest',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065796'
  //   },
  //   {
  //     'id': 226,
  //     'course': 'RxJs',
  //     'idCategory': 28,
  //     'category': 'Multicast & RxJS Subjects',
  //     'slug': 'introduzione-al-concetto-di-subject---unicast-vs-multicast-(10:01)',
  //     'title': 'Introduzione al concetto di Subject - unicast vs multicast (10:01)',
  //     'time': '10:01',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065780'
  //   },
  //   {
  //     'id': 227,
  //     'course': 'RxJs',
  //     'idCategory': 28,
  //     'category': 'Multicast & RxJS Subjects',
  //     'slug': 'utilizzo-behaviorsubject-per-contenere-e-condividere-dati-(6:51)',
  //     'title': 'Utilizzo BehaviorSubject per contenere e condividere dati (6:51)',
  //     'time': '6:51',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065781'
  //   },
  //   {
  //     'id': 228,
  //     'course': 'RxJs',
  //     'idCategory': 28,
  //     'category': 'Multicast & RxJS Subjects',
  //     'slug': 'subject-as-observer-(5:03)',
  //     'title': 'Subject as Observer (5:03)',
  //     'time': '5:03',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065782'
  //   },
  //   {
  //     'id': 229,
  //     'course': 'RxJs',
  //     'idCategory': 28,
  //     'category': 'Multicast & RxJS Subjects',
  //     'slug': 'multicast:-"subject"-vs-operatore-"share"-(4:32)',
  //     'title': 'Multicast: "Subject" vs operatore "share" (4:32)',
  //     'time': '4:32',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065783'
  //   },
  //   {
  //     'id': 230,
  //     'course': 'RxJs',
  //     'idCategory': 28,
  //     'category': 'Multicast & RxJS Subjects',
  //     'slug': 'subject"-vs-"behaviorssubject"-vs-"replaysubject"-vs-"asyncsubject"-(6:31)',
  //     'title': 'Subject" vs "BehaviorsSubject" vs "ReplaySubject" vs "AsyncSubject" (6:31)',
  //     'time': '6:31',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065784'
  //   },
  //   {
  //     'id': 231,
  //     'course': 'RxJs',
  //     'idCategory': 28,
  //     'category': 'Multicast & RxJS Subjects',
  //     'slug': 'sommario-e-demo-sulle-diverse-tipologie-di-subject-(2:03)',
  //     'title': 'Sommario e demo sulle diverse tipologie di Subject (2:03)',
  //     'time': '2:03',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065785'
  //   },
  //   {
  //     'id': 232,
  //     'course': 'RxJs',
  //     'idCategory': 28,
  //     'category': 'Multicast & RxJS Subjects',
  //     'slug': 'risorse-e-marble-diagrams',
  //     'title': 'Risorse e marble diagrams',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/12065786'
  //   },
  //   {
  //     'id': 233,
  //     'course': 'RxJs',
  //     'idCategory': 29,
  //     'category': 'EXTRA: intro functional programming by Andrea Bertoli',
  //     'slug': 'intro',
  //     'title': 'Intro',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/14415465'
  //   },
  //   {
  //     'id': 234,
  //     'course': 'RxJs',
  //     'idCategory': 29,
  //     'category': 'EXTRA: intro functional programming by Andrea Bertoli',
  //     'slug': '1.-introduzione-alla-fp-(5:08)',
  //     'title': '1. Introduzione alla FP (5:08)',
  //     'time': '5:08',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/14415450'
  //   },
  //   {
  //     'id': 235,
  //     'course': 'RxJs',
  //     'idCategory': 29,
  //     'category': 'EXTRA: intro functional programming by Andrea Bertoli',
  //     'slug': '2.-composizione-di-funzioni-(3:58)',
  //     'title': '2. Composizione di funzioni (3:58)',
  //     'time': '3:58',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/14415452'
  //   },
  //   {
  //     'id': 236,
  //     'course': 'RxJs',
  //     'idCategory': 29,
  //     'category': 'EXTRA: intro functional programming by Andrea Bertoli',
  //     'slug': '3.-immutabilità,-side-effects-e-stato-(4:41)',
  //     'title': '3. Immutabilità, side effects e stato (4:41)',
  //     'time': '4:41',
  //     'url': 'https://fabiobiondi.teachable.com/courses/676637/lectures/14415456'
  //   },
  //   {
  //     'id': 237,
  //     'course': 'NgRx',
  //     'idCategory': 30,
  //     'category': 'Introduzione',
  //     'slug': 'presentazione-corso-(9:11)',
  //     'title': 'Presentazione corso (9:11)',
  //     'time': '9:11',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/13151500'
  //   },
  //   {
  //     'id': 238,
  //     'course': 'NgRx',
  //     'idCategory': 30,
  //     'category': 'Introduzione',
  //     'slug': 'gruppo-facebook,-supporto-e-link',
  //     'title': 'Gruppo Facebook, supporto e Link',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/13737205'
  //   },
  //   {
  //     'id': 239,
  //     'course': 'NgRx',
  //     'idCategory': 31,
  //     'category': 'Introduzione a NGRX e REDUX',
  //     'slug': '1.-a-cosa-serve-uno-state-manager-(4:43)',
  //     'title': '1. A cosa serve uno state manager (4:43)',
  //     'time': '4:43',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11423743'
  //   },
  //   {
  //     'id': 240,
  //     'course': 'NgRx',
  //     'idCategory': 31,
  //     'category': 'Introduzione a NGRX e REDUX',
  //     'slug': '2.-cos\'é-ngrx:-pro-e-contro-(12:12)',
  //     'title': '2. Cos\'é NGRX: pro e contro (12:12)',
  //     'time': '12:12',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11423742'
  //   },
  //   {
  //     'id': 241,
  //     'course': 'NgRx',
  //     'idCategory': 31,
  //     'category': 'Introduzione a NGRX e REDUX',
  //     'slug': '3.-ngrx-diagram-(6:17)',
  //     'title': '3. NGRX Diagram (6:17)',
  //     'time': '6:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11423746'
  //   },
  //   {
  //     'id': 242,
  //     'course': 'NgRx',
  //     'idCategory': 31,
  //     'category': 'Introduzione a NGRX e REDUX',
  //     'slug': '4.-progetto-e-struttura-cartelle-(5:56)',
  //     'title': '4. Progetto e struttura cartelle (5:56)',
  //     'time': '5:56',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11423745'
  //   },
  //   {
  //     'id': 243,
  //     'course': 'NgRx',
  //     'idCategory': 31,
  //     'category': 'Introduzione a NGRX e REDUX',
  //     'slug': '5.-ngrx:-code-preview-(9:06)',
  //     'title': '5. NGRX: code preview (9:06)',
  //     'time': '9:06',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11423744'
  //   },
  //   {
  //     'id': 244,
  //     'course': 'NgRx',
  //     'idCategory': 31,
  //     'category': 'Introduzione a NGRX e REDUX',
  //     'slug': '6.-stateless-applications-(6:02)',
  //     'title': '6. Stateless applications (6:02)',
  //     'time': '6:02',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11423747'
  //   },
  //   {
  //     'id': 245,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': 'introduzione-al-capitolo-(teoria---articolo)',
  //     'title': 'Introduzione al capitolo (teoria - articolo)',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11323331'
  //   },
  //   {
  //     'id': 246,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '1.-goal:-cosa-realizzeremo-in-questo-capitolo-(3:32)',
  //     'title': '1. GOAL: cosa realizzeremo in questo capitolo (3:32)',
  //     'time': '3:32',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11546493'
  //   },
  //   {
  //     'id': 247,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '2.-store,-reducers-e-actions-(teoria)-(8:06)',
  //     'title': '2. Store, reducers e Actions (TEORIA) (8:06)',
  //     'time': '8:06',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11546506'
  //   },
  //   {
  //     'id': 248,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '3.-creazione-progetto-(1:56)',
  //     'title': '3. Creazione Progetto (1:56)',
  //     'time': '1:56',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299012'
  //   },
  //   {
  //     'id': 249,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '4.-hello-ngrx-(3:54)',
  //     'title': '4. Hello NGRX (3:54)',
  //     'time': '3:54',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299020'
  //   },
  //   {
  //     'id': 250,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '5.-ngrx-&-redux-devtools-(3:50)',
  //     'title': '5. NGRX & Redux DevTools (3:50)',
  //     'time': '3:50',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299017'
  //   },
  //   {
  //     'id': 251,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '6.-lo-store-(0:55)',
  //     'title': '6. Lo Store (0:55)',
  //     'time': '0:55',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299019'
  //   },
  //   {
  //     'id': 252,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '7.-selectors-(4:25)',
  //     'title': '7. Selectors (4:25)',
  //     'time': '4:25',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299018'
  //   },
  //   {
  //     'id': 253,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '8.-selectors-&-ngfor-(3:30)',
  //     'title': '8. Selectors & ngFor (3:30)',
  //     'time': '3:30',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299021'
  //   },
  //   {
  //     'id': 254,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '9.-actions-(5:43)',
  //     'title': '9. Actions (5:43)',
  //     'time': '5:43',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299022'
  //   },
  //   {
  //     'id': 255,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '10.-reducers-(5:13)',
  //     'title': '10. Reducers (5:13)',
  //     'time': '5:13',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299023'
  //   },
  //   {
  //     'id': 256,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '11.-azioni-con-parametri-(6:38)',
  //     'title': '11. Azioni con parametri (6:38)',
  //     'time': '6:38',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299024'
  //   },
  //   {
  //     'id': 257,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '12.-reduxdevtools:-dettagli-e-considerazioni-(7:26)',
  //     'title': '12. ReduxDevTools: dettagli e considerazioni (7:26)',
  //     'time': '7:26',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299014'
  //   },
  //   {
  //     'id': 258,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': '13:-manipolare-array:-add-e-remove-(9:35)',
  //     'title': '13: Manipolare Array: ADD e REMOVE (9:35)',
  //     'time': '9:35',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299016'
  //   },
  //   {
  //     'id': 259,
  //     'course': 'NgRx',
  //     'idCategory': 32,
  //     'category': 'NGRX Fundamentals',
  //     'slug': 'quiz---ngrx-fundamentals',
  //     'title': 'Quiz - NGRX Fundamentals',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11548408'
  //   },
  //   {
  //     'id': 260,
  //     'course': 'NgRx',
  //     'idCategory': 33,
  //     'category': 'NGRX: work with collections',
  //     'slug': '01.-goal:-manipolare-collezioni-dati-in-ngrx-(3:11)',
  //     'title': '01. GOAL: manipolare collezioni dati in NGRX (3:11)',
  //     'time': '3:11',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11323328'
  //   },
  //   {
  //     'id': 261,
  //     'course': 'NgRx',
  //     'idCategory': 33,
  //     'category': 'NGRX: work with collections',
  //     'slug': '02.-ngrx-actions-(3:05)',
  //     'title': '02. NGRX Actions (3:05)',
  //     'time': '3:05',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299010'
  //   },
  //   {
  //     'id': 262,
  //     'course': 'NgRx',
  //     'idCategory': 33,
  //     'category': 'NGRX: work with collections',
  //     'slug': '03.-es6-tip:-immutabilità-e-manipolazione-array-(8:40)',
  //     'title': '03. ES6 TIP: Immutabilità e manipolazione array (8:40)',
  //     'time': '8:40',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11426341'
  //   },
  //   {
  //     'id': 263,
  //     'course': 'NgRx',
  //     'idCategory': 33,
  //     'category': 'NGRX: work with collections',
  //     'slug': '04.-"users"-reducer-(7:39)',
  //     'title': '04. "users" reducer (7:39)',
  //     'time': '7:39',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299013'
  //   },
  //   {
  //     'id': 264,
  //     'course': 'NgRx',
  //     'idCategory': 33,
  //     'category': 'NGRX: work with collections',
  //     'slug': '05.-ui:-forms,-add-e-delete-(9:10)',
  //     'title': '05. UI: forms, add e delete (9:10)',
  //     'time': '9:10',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299011'
  //   },
  //   {
  //     'id': 265,
  //     'course': 'NgRx',
  //     'idCategory': 33,
  //     'category': 'NGRX: work with collections',
  //     'slug': '06.-modifica-dei-dati-utenti-e-"bugs"-(12:26)',
  //     'title': '06. Modifica dei dati utenti e "bugs" (12:26)',
  //     'time': '12:26',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11299015'
  //   },
  //   {
  //     'id': 266,
  //     'course': 'NgRx',
  //     'idCategory': 33,
  //     'category': 'NGRX: work with collections',
  //     'slug': 'quiz---ngrx:-wotk-with-collections',
  //     'title': 'Quiz - NGRX: Wotk with collections',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11548476'
  //   },
  //   {
  //     'id': 267,
  //     'course': 'NgRx',
  //     'idCategory': 33,
  //     'category': 'NGRX: work with collections',
  //     'slug': 'download-source-code',
  //     'title': 'Download source code',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/14623068'
  //   },
  //   {
  //     'id': 268,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '01.-goal:-ngrx-crud-apps-(8:19)',
  //     'title': '01. GOAL: NGRX CRUD apps (8:19)',
  //     'time': '8:19',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11323325'
  //   },
  //   {
  //     'id': 269,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '02.-creazione-progetto-(0:54)',
  //     'title': '02. Creazione Progetto (0:54)',
  //     'time': '0:54',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11314129'
  //   },
  //   {
  //     'id': 270,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '03.-installazione-mock-server-rest-(2:12)',
  //     'title': '03. Installazione mock server REST (2:12)',
  //     'time': '2:12',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11314125'
  //   },
  //   {
  //     'id': 271,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '04.-installazione-ngrx-e-configurazione-store-(1:21)',
  //     'title': '04. Installazione NGRX e configurazione Store (1:21)',
  //     'time': '1:21',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11314127'
  //   },
  //   {
  //     'id': 272,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '05.-actions-(3:17)',
  //     'title': '05. Actions (3:17)',
  //     'time': '3:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11322223'
  //   },
  //   {
  //     'id': 273,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '06.-es6-tip:-immutabilità-e-manipolazione-oggetti-(4:08)',
  //     'title': '06. ES6 TIP: immutabilità e manipolazione oggetti (4:08)',
  //     'time': '4:08',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11424428'
  //   },
  //   {
  //     'id': 274,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '07.-reducer-"compositi"-contenenti-logica-(12:21)',
  //     'title': '07. Reducer "compositi" contenenti logica (12:21)',
  //     'time': '12:21',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11322224'
  //   },
  //   {
  //     'id': 275,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '08.-sviluppo-ui:-form-e-list---parte-1-(12:00)',
  //     'title': '08. Sviluppo UI: form e list - parte 1 (12:00)',
  //     'time': '12:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11314128'
  //   },
  //   {
  //     'id': 276,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '09.-sviluppo-ui:-form-e-list---parte-1-(6:25)',
  //     'title': '09. Sviluppo UI: form e list - parte 1 (6:25)',
  //     'time': '6:25',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11495248'
  //   },
  //   {
  //     'id': 277,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '10.-effects:-introduzione-alla-sintassi-e-al-funzionamento-(teoria)-(7:32)',
  //     'title': '10. Effects: introduzione alla sintassi e al funzionamento (TEORIA) (7:32)',
  //     'time': '7:32',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11323377'
  //   },
  //   {
  //     'id': 278,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '11.-effects---parte-1:-load-(11:28)',
  //     'title': '11. Effects - Parte 1: load (11:28)',
  //     'time': '11:28',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11322225'
  //   },
  //   {
  //     'id': 279,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': 'tip:-importare-l\'effetto-e-httpclientmodule-in-appmodule',
  //     'title': 'TIP: importare l\'effetto e HttpClientModule in AppModule',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/14048861'
  //   },
  //   {
  //     'id': 280,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '12.-effects---parte-2:-delete-(6:02)',
  //     'title': '12. Effects - Parte 2: delete (6:02)',
  //     'time': '6:02',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11316175'
  //   },
  //   {
  //     'id': 281,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '13.-effects---parte-3:-save,-edit,-add-and-fix-problemi-(20:07)',
  //     'title': '13. Effects - Parte 3: save, edit, add and fix problemi (20:07)',
  //     'time': '20:07',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11316173'
  //   },
  //   {
  //     'id': 282,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '14.-appstate:-custom-type-per-lo-store-(2:28)',
  //     'title': '14. AppState: custom type per lo Store (2:28)',
  //     'time': '2:28',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11316171'
  //   },
  //   {
  //     'id': 283,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '15.-combine-reducers-con-actionreducermap-(6:33)',
  //     'title': '15. Combine Reducers con ActionReducerMap (6:33)',
  //     'time': '6:33',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11316174'
  //   },
  //   {
  //     'id': 284,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '16.-selectors-(5:11)',
  //     'title': '16. Selectors (5:11)',
  //     'time': '5:11',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11316170'
  //   },
  //   {
  //     'id': 285,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '17.-createselector:-selectors-con-parametri-ed-espressioni-(utilizzo-di-filter-&-reduce)-(8:26)',
  //     'title': '17. CreateSelector: selectors con parametri ed espressioni (utilizzo di filter & reduce) (8:26)',
  //     'time': '8:26',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11316177'
  //   },
  //   {
  //     'id': 286,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '18.-selectors:-miglioramenti-(1:28)',
  //     'title': '18. Selectors: miglioramenti (1:28)',
  //     'time': '1:28',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11316176'
  //   },
  //   {
  //     'id': 287,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': '19.-gestione-errori-(7:28)',
  //     'title': '19. Gestione Errori (7:28)',
  //     'time': '7:28',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11323271'
  //   },
  //   {
  //     'id': 288,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': 'download-source-code',
  //     'title': 'Download source code',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11495543'
  //   },
  //   {
  //     'id': 289,
  //     'course': 'NgRx',
  //     'idCategory': 34,
  //     'category': 'NGRX - CRUD apps',
  //     'slug': 'quiz---ngrx-crud',
  //     'title': 'QUIZ - NGRX Crud',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11548621'
  //   },
  //   {
  //     'id': 290,
  //     'course': 'NgRx',
  //     'idCategory': 35,
  //     'category': 'InvoiceApp: creare un sistema di fatturazione',
  //     'slug': '01.-gli-argomenti-delle-prossime-lezioni-(articolo)',
  //     'title': '01. Gli argomenti delle prossime lezioni (articolo)',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453155'
  //   },
  //   {
  //     'id': 291,
  //     'course': 'NgRx',
  //     'idCategory': 35,
  //     'category': 'InvoiceApp: creare un sistema di fatturazione',
  //     'slug': '02.-goal:-demo-applicazione-(4:50)',
  //     'title': '02. GOAL: demo applicazione (4:50)',
  //     'time': '4:50',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11547027'
  //   },
  //   {
  //     'id': 292,
  //     'course': 'NgRx',
  //     'idCategory': 35,
  //     'category': 'InvoiceApp: creare un sistema di fatturazione',
  //     'slug': '03.-anticipazione:-codice-finale-(4:24)',
  //     'title': '03. Anticipazione: codice finale (4:24)',
  //     'time': '4:24',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11547273'
  //   },
  //   {
  //     'id': 293,
  //     'course': 'NgRx',
  //     'idCategory': 35,
  //     'category': 'InvoiceApp: creare un sistema di fatturazione',
  //     'slug': 'download-source-code',
  //     'title': 'Download Source Code',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/14623093'
  //   },
  //   {
  //     'id': 294,
  //     'course': 'NgRx',
  //     'idCategory': 36,
  //     'category': 'InvoiceApp: Preparazione Progetto',
  //     'slug': '01.-creazione-progetto-tramite-cli-(2:31)',
  //     'title': '01. Creazione progetto tramite CLI (2:31)',
  //     'time': '2:31',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11546953'
  //   },
  //   {
  //     'id': 295,
  //     'course': 'NgRx',
  //     'idCategory': 36,
  //     'category': 'InvoiceApp: Preparazione Progetto',
  //     'slug': '02.-introduzione-struttura-progetto-modulare:-features-vs-core-vs-shared-(3:42)',
  //     'title': '02. Introduzione struttura progetto modulare: features vs core vs shared (3:42)',
  //     'time': '3:42',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453904'
  //   },
  //   {
  //     'id': 296,
  //     'course': 'NgRx',
  //     'idCategory': 36,
  //     'category': 'InvoiceApp: Preparazione Progetto',
  //     'slug': '03.-"features"-modules-&-lazy-loading-(8:13)',
  //     'title': '03. "Features" modules & lazy loading (8:13)',
  //     'time': '8:13',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453110'
  //   },
  //   {
  //     'id': 297,
  //     'course': 'NgRx',
  //     'idCategory': 36,
  //     'category': 'InvoiceApp: Preparazione Progetto',
  //     'slug': '04.-installare-il-set-di-icone:-fortawesome-(2:24)',
  //     'title': '04. Installare il set di icone: FortAwesome (2:24)',
  //     'time': '2:24',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453109'
  //   },
  //   {
  //     'id': 298,
  //     'course': 'NgRx',
  //     'idCategory': 36,
  //     'category': 'InvoiceApp: Preparazione Progetto',
  //     'slug': '05.-installare-bootstrap-sass-(2:51)',
  //     'title': '05. Installare Bootstrap SASS (2:51)',
  //     'time': '2:51',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453112'
  //   },
  //   {
  //     'id': 299,
  //     'course': 'NgRx',
  //     'idCategory': 36,
  //     'category': 'InvoiceApp: Preparazione Progetto',
  //     'slug': '06.-personalizzare-un-tema-di-bootstrap-con-sass-(4:48)',
  //     'title': '06. Personalizzare un tema di Bootstrap con SASS (4:48)',
  //     'time': '4:48',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453111'
  //   },
  //   {
  //     'id': 300,
  //     'course': 'NgRx',
  //     'idCategory': 36,
  //     'category': 'InvoiceApp: Preparazione Progetto',
  //     'slug': '07.-creare-la-navigation-bar-(6:50)',
  //     'title': '07. Creare la Navigation Bar (6:50)',
  //     'time': '6:50',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453113'
  //   },
  //   {
  //     'id': 301,
  //     'course': 'NgRx',
  //     'idCategory': 36,
  //     'category': 'InvoiceApp: Preparazione Progetto',
  //     'slug': '08.-modulo-core-e-modulo-share:-forroot-method-(6:06)',
  //     'title': '08. Modulo core e modulo share: forRoot method (6:06)',
  //     'time': '6:06',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453114'
  //   },
  //   {
  //     'id': 302,
  //     'course': 'NgRx',
  //     'idCategory': 37,
  //     'category': 'InvoiceApp: Configurazione Store',
  //     'slug': '1---ngrx---storemodule.forroot()-(teoria)-(4:17)',
  //     'title': '1 - NGRX - StoreModule.forRoot() (Teoria) (4:17)',
  //     'time': '4:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11509252'
  //   },
  //   {
  //     'id': 303,
  //     'course': 'NgRx',
  //     'idCategory': 37,
  //     'category': 'InvoiceApp: Configurazione Store',
  //     'slug': '2.-installazione-ngrx-e-configurazione-store-(2:21)',
  //     'title': '2. Installazione NGRX e configurazione Store (2:21)',
  //     'time': '2:21',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453138'
  //   },
  //   {
  //     'id': 304,
  //     'course': 'NgRx',
  //     'idCategory': 37,
  //     'category': 'InvoiceApp: Configurazione Store',
  //     'slug': '3.-runtime-checks-configuration-(3:14)',
  //     'title': '3. Runtime checks configuration (3:14)',
  //     'time': '3:14',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453137'
  //   },
  //   {
  //     'id': 305,
  //     'course': 'NgRx',
  //     'idCategory': 38,
  //     'category': 'InvoiceApp: Sync Router con lo Store',
  //     'slug': '01.-installazione-e-configurazione-router-store-con-ngrx-(2:59)',
  //     'title': '01. Installazione e configurazione router-store con NGRX (2:59)',
  //     'time': '2:59',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453139'
  //   },
  //   {
  //     'id': 306,
  //     'course': 'NgRx',
  //     'idCategory': 38,
  //     'category': 'InvoiceApp: Sync Router con lo Store',
  //     'slug': '02.-creare-custom-router-actions-(5:42)',
  //     'title': '02. Creare Custom Router Actions (5:42)',
  //     'time': '5:42',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453136'
  //   },
  //   {
  //     'id': 307,
  //     'course': 'NgRx',
  //     'idCategory': 38,
  //     'category': 'InvoiceApp: Sync Router con lo Store',
  //     'slug': '03.-router-effects-(9:28)',
  //     'title': '03. Router Effects (9:28)',
  //     'time': '9:28',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453167'
  //   },
  //   {
  //     'id': 308,
  //     'course': 'NgRx',
  //     'idCategory': 38,
  //     'category': 'InvoiceApp: Sync Router con lo Store',
  //     'slug': '04.-router-selectors-(10:28)',
  //     'title': '04. Router Selectors (10:28)',
  //     'time': '10:28',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453206'
  //   },
  //   {
  //     'id': 309,
  //     'course': 'NgRx',
  //     'idCategory': 38,
  //     'category': 'InvoiceApp: Sync Router con lo Store',
  //     'slug': 'tip:-un-approccio-più-idiomatico-nell\'utilizzo-del-selettore-(articolo)',
  //     'title': 'TIP: un approccio più idiomatico nell\'utilizzo del selettore (articolo)',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11496058'
  //   },
  //   {
  //     'id': 310,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': 'goal:-profilo-utente-(1:14)',
  //     'title': 'GOAL: profilo utente (1:14)',
  //     'time': '1:14',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11547418'
  //   },
  //   {
  //     'id': 311,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '01.-model-&-mock-server-rest-con-json-server-(4:06)',
  //     'title': '01. Model & mock server REST con json-server (4:06)',
  //     'time': '4:06',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453296'
  //   },
  //   {
  //     'id': 312,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '02.-profile-service-&-environment-properties-(5:38)',
  //     'title': '02. Profile Service & Environment properties (5:38)',
  //     'time': '5:38',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453295'
  //   },
  //   {
  //     'id': 313,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '03.-profile-actions-(1:45)',
  //     'title': '03. Profile Actions (1:45)',
  //     'time': '1:45',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453297'
  //   },
  //   {
  //     'id': 314,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '04.-profile-effects-(6:31)',
  //     'title': '04. Profile Effects (6:31)',
  //     'time': '6:31',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453298'
  //   },
  //   {
  //     'id': 315,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '05.-profile-reducer-(12:14)',
  //     'title': '05. Profile Reducer (12:14)',
  //     'time': '12:14',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453480'
  //   },
  //   {
  //     'id': 316,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '06.-ts-tip:-as-syntax-vs-partial-vs-optional-parameters-(2:35)',
  //     'title': '06. TS TIP: as-syntax vs Partial vs optional-parameters (2:35)',
  //     'time': '2:35',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11536076'
  //   },
  //   {
  //     'id': 317,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '07.-ngrx-tip:-export-reducer-functions-&-limiti-compilazione-aot-(4:37)',
  //     'title': '07. NGRX-TIP: export reducer functions & limiti compilazione AoT (4:37)',
  //     'time': '4:37',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11535823'
  //   },
  //   {
  //     'id': 318,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '08.-selectors-&-createfeatureselector-(4:16)',
  //     'title': '08. Selectors & createFeatureSelector (4:16)',
  //     'time': '4:16',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453482'
  //   },
  //   {
  //     'id': 319,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '09.-appstate:-"tipizzare"-lo-store-(3:21)',
  //     'title': '09. AppState: "tipizzare" lo Store (3:21)',
  //     'time': '3:21',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453479'
  //   },
  //   {
  //     'id': 320,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '10.-profile-component:-load-&-display-data-(5:46)',
  //     'title': '10. Profile component: load & display data (5:46)',
  //     'time': '5:46',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453483'
  //   },
  //   {
  //     'id': 321,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '11.-profile-component:-edit-data-&-sync-components-(9:25)',
  //     'title': '11. Profile component: edit data & sync components (9:25)',
  //     'time': '9:25',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453481'
  //   },
  //   {
  //     'id': 322,
  //     'course': 'NgRx',
  //     'idCategory': 39,
  //     'category': 'InvoiceApp: Gestione Profilo Utente',
  //     'slug': '12.-profile-component:-skinning-(3:48)',
  //     'title': '12. Profile component: skinning (3:48)',
  //     'time': '3:48',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11453478'
  //   },
  //   {
  //     'id': 323,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': 'goal:-autenticazione-e-struttura-store-(3:24)',
  //     'title': 'GOAL: autenticazione e struttura store (3:24)',
  //     'time': '3:24',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11547370'
  //   },
  //   {
  //     'id': 324,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '01.-login-component-(5:21)',
  //     'title': '01. Login Component (5:21)',
  //     'time': '5:21',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461768'
  //   },
  //   {
  //     'id': 325,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '02.-auth-actions-(5:24)',
  //     'title': '02. Auth Actions (5:24)',
  //     'time': '5:24',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461771'
  //   },
  //   {
  //     'id': 326,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '03.-auth-service-(4:15)',
  //     'title': '03. Auth service (4:15)',
  //     'time': '4:15',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461772'
  //   },
  //   {
  //     'id': 327,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '04.-auth-effects:-login-&-logout-(19:57)',
  //     'title': '04. Auth Effects: login & logout (19:57)',
  //     'time': '19:57',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461770'
  //   },
  //   {
  //     'id': 328,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '05.-auth-reducer:-login-&-logout-(7:08)',
  //     'title': '05. Auth Reducer: login & logout (7:08)',
  //     'time': '7:08',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461769'
  //   },
  //   {
  //     'id': 329,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '06.-auth-selectors-(2:33)',
  //     'title': '06. Auth selectors (2:33)',
  //     'time': '2:33',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461773'
  //   },
  //   {
  //     'id': 330,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '07.-gestione-logout-(3:36)',
  //     'title': '07. Gestione Logout (3:36)',
  //     'time': '3:36',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461774'
  //   },
  //   {
  //     'id': 331,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '08.-guards:-protezione-route-e-utilizzo-dei-selettori-(11:15)',
  //     'title': '08. Guards: protezione route e utilizzo dei selettori (11:15)',
  //     'time': '11:15',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461775'
  //   },
  //   {
  //     'id': 332,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '09.-autologin:-init-effects.-azioni-e-gestione-localstorage-(10:13)',
  //     'title': '09. Autologin: init-effects. azioni e gestione localstorage (10:13)',
  //     'time': '10:13',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461776'
  //   },
  //   {
  //     'id': 333,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': 'tip-su-httpinterceptor:-importante!',
  //     'title': 'TIP su HttpInterceptor: IMPORTANTE!',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/14100680'
  //   },
  //   {
  //     'id': 334,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '10.-httpinterceptor:-selectors-(15:50)',
  //     'title': '10. HTTPInterceptor: selectors (15:50)',
  //     'time': '15:50',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461951'
  //   },
  //   {
  //     'id': 335,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '11.-httpinterceptor:-gestione-errori-(3:48)',
  //     'title': '11. HTTPInterceptor: gestione errori (3:48)',
  //     'time': '3:48',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461952'
  //   },
  //   {
  //     'id': 336,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '12.-httpinterceptor:-throwerror-(3:28)',
  //     'title': '12. HTTPInterceptor: throwError (3:28)',
  //     'time': '3:28',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11503285'
  //   },
  //   {
  //     'id': 337,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '13.-creazione-direttive-strutturali-(*iflogged):-protezione-dom-(13:38)',
  //     'title': '13. Creazione Direttive strutturali (*ifLogged): protezione DOM (13:38)',
  //     'time': '13:38',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11461953'
  //   },
  //   {
  //     'id': 338,
  //     'course': 'NgRx',
  //     'idCategory': 40,
  //     'category': 'Invoice App: Autenticazione e Sicurezza',
  //     'slug': '14.-rxjs-tip:-evitare-inutili-richieste-http-nel-login:-switchmap-vs-exhaustmap-(2:01)',
  //     'title': '14. RXJS TIP: evitare inutili richieste HTTP nel login: switchmap vs exhaustmap (2:01)',
  //     'time': '2:01',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11496743'
  //   },
  //   {
  //     'id': 339,
  //     'course': 'NgRx',
  //     'idCategory': 41,
  //     'category': 'InvoiceApp: introduzione alla feature InvoiceEditor',
  //     'slug': '01.-goal-e-struttura-store-(4:22)',
  //     'title': '01. GOAL e struttura store (4:22)',
  //     'time': '4:22',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11483449'
  //   },
  //   {
  //     'id': 340,
  //     'course': 'NgRx',
  //     'idCategory': 41,
  //     'category': 'InvoiceApp: introduzione alla feature InvoiceEditor',
  //     'slug': '02.-ngrx:-introduzione-store-"forfeature()"-(6:17)',
  //     'title': '02. NGRX: Introduzione store "forFeature()" (6:17)',
  //     'time': '6:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11509256'
  //   },
  //   {
  //     'id': 341,
  //     'course': 'NgRx',
  //     'idCategory': 41,
  //     'category': 'InvoiceApp: introduzione alla feature InvoiceEditor',
  //     'slug': '03.-creazione:-store-for-feature-(4:32)',
  //     'title': '03. Creazione: store for feature (4:32)',
  //     'time': '4:32',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11483448'
  //   },
  //   {
  //     'id': 342,
  //     'course': 'NgRx',
  //     'idCategory': 41,
  //     'category': 'InvoiceApp: introduzione alla feature InvoiceEditor',
  //     'slug': '04.-combine-reducers-con-actionreducermap-(3:12)',
  //     'title': '04. Combine Reducers con ActionReducerMap (3:12)',
  //     'time': '3:12',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11483450'
  //   },
  //   {
  //     'id': 343,
  //     'course': 'NgRx',
  //     'idCategory': 41,
  //     'category': 'InvoiceApp: introduzione alla feature InvoiceEditor',
  //     'slug': 'prossimi-step:-nota-importante',
  //     'title': 'Prossimi step: nota importante',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11483436'
  //   },
  //   {
  //     'id': 344,
  //     'course': 'NgRx',
  //     'idCategory': 42,
  //     'category': 'InvoiceEditor -> Clients: UI',
  //     'slug': '01.-goal-(2:51)',
  //     'title': '01. GOAL (2:51)',
  //     'time': '2:51',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484045'
  //   },
  //   {
  //     'id': 345,
  //     'course': 'NgRx',
  //     'idCategory': 42,
  //     'category': 'InvoiceEditor -> Clients: UI',
  //     'slug': '02.-struttura-ui-&-component-based-approach-(0:52)',
  //     'title': '02. Struttura UI & component-based approach (0:52)',
  //     'time': '0:52',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11547590'
  //   },
  //   {
  //     'id': 346,
  //     'course': 'NgRx',
  //     'idCategory': 42,
  //     'category': 'InvoiceEditor -> Clients: UI',
  //     'slug': '03.-ui:-componente-pannello-clienti-(11:47)',
  //     'title': '03. UI: componente pannello Clienti (11:47)',
  //     'time': '11:47',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484044'
  //   },
  //   {
  //     'id': 347,
  //     'course': 'NgRx',
  //     'idCategory': 42,
  //     'category': 'InvoiceEditor -> Clients: UI',
  //     'slug': '04.-ui:-input,-output,-ng-class-&-animations-(6:03)',
  //     'title': '04. UI: input, output, ng-class & animations (6:03)',
  //     'time': '6:03',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484052'
  //   },
  //   {
  //     'id': 348,
  //     'course': 'NgRx',
  //     'idCategory': 42,
  //     'category': 'InvoiceEditor -> Clients: UI',
  //     'slug': '05.-ui-children---parte-1:-suddividere-la-ui-in-componenti-(12:39)',
  //     'title': '05. UI Children - parte 1: suddividere la UI in componenti (12:39)',
  //     'time': '12:39',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484047'
  //   },
  //   {
  //     'id': 349,
  //     'course': 'NgRx',
  //     'idCategory': 42,
  //     'category': 'InvoiceEditor -> Clients: UI',
  //     'slug': '06.-ui-children---parte-2:-creazione-header-/-add-clients-(7:35)',
  //     'title': '06. UI Children - parte 2: creazione header / ADD clients (7:35)',
  //     'time': '7:35',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484043'
  //   },
  //   {
  //     'id': 350,
  //     'course': 'NgRx',
  //     'idCategory': 42,
  //     'category': 'InvoiceEditor -> Clients: UI',
  //     'slug': '07.-ui-children---parte-3:-header,-@viewchild-&-changedetectorref-(17:04)',
  //     'title': '07. UI Children - parte 3: Header, @ViewChild & ChangeDetectorRef (17:04)',
  //     'time': '17:04',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484046'
  //   },
  //   {
  //     'id': 351,
  //     'course': 'NgRx',
  //     'idCategory': 42,
  //     'category': 'InvoiceEditor -> Clients: UI',
  //     'slug': '08.-ui-children---parte-4:-modifica-cliente-(1:50)',
  //     'title': '08. UI Children - parte 4: Modifica Cliente (1:50)',
  //     'time': '1:50',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484048'
  //   },
  //   {
  //     'id': 352,
  //     'course': 'NgRx',
  //     'idCategory': 42,
  //     'category': 'InvoiceEditor -> Clients: UI',
  //     'slug': '09.-ui-children---parte-5:-applicare-css-al-wrapper-con-@hostbinding-(3:21)',
  //     'title': '09. UI Children - parte 5: applicare CSS al wrapper con @HostBinding (3:21)',
  //     'time': '3:21',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484051'
  //   },
  //   {
  //     'id': 353,
  //     'course': 'NgRx',
  //     'idCategory': 42,
  //     'category': 'InvoiceEditor -> Clients: UI',
  //     'slug': '10.-client-model-(2:47)',
  //     'title': '10. Client Model (2:47)',
  //     'time': '2:47',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484050'
  //   },
  //   {
  //     'id': 354,
  //     'course': 'NgRx',
  //     'idCategory': 42,
  //     'category': 'InvoiceEditor -> Clients: UI',
  //     'slug': '11.-riassunto-e-prossimo-step-(3:35)',
  //     'title': '11. Riassunto e prossimo step (3:35)',
  //     'time': '3:35',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484049'
  //   },
  //   {
  //     'id': 355,
  //     'course': 'NgRx',
  //     'idCategory': 43,
  //     'category': 'InvoiceEditor -> Clients: gestione STORE',
  //     'slug': '01.-clientservice-&-rest-api-(4:19)',
  //     'title': '01. ClientService & REST API (4:19)',
  //     'time': '4:19',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484111'
  //   },
  //   {
  //     'id': 356,
  //     'course': 'NgRx',
  //     'idCategory': 43,
  //     'category': 'InvoiceEditor -> Clients: gestione STORE',
  //     'slug': '02.-clients-actions-(2:05)',
  //     'title': '02. Clients Actions (2:05)',
  //     'time': '2:05',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484109'
  //   },
  //   {
  //     'id': 357,
  //     'course': 'NgRx',
  //     'idCategory': 43,
  //     'category': 'InvoiceEditor -> Clients: gestione STORE',
  //     'slug': '03.-clients-effects---parte-1-(4:47)',
  //     'title': '03. Clients Effects - Parte 1 (4:47)',
  //     'time': '4:47',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484110'
  //   },
  //   {
  //     'id': 358,
  //     'course': 'NgRx',
  //     'idCategory': 43,
  //     'category': 'InvoiceEditor -> Clients: gestione STORE',
  //     'slug': '04.-clients-effects---parte-2-(4:12)',
  //     'title': '04. Clients Effects - Parte 2 (4:12)',
  //     'time': '4:12',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484112'
  //   },
  //   {
  //     'id': 359,
  //     'course': 'NgRx',
  //     'idCategory': 43,
  //     'category': 'InvoiceEditor -> Clients: gestione STORE',
  //     'slug': '05.-clients:-load-(3:03)',
  //     'title': '05. Clients: Load (3:03)',
  //     'time': '3:03',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484114'
  //   },
  //   {
  //     'id': 360,
  //     'course': 'NgRx',
  //     'idCategory': 43,
  //     'category': 'InvoiceEditor -> Clients: gestione STORE',
  //     'slug': '06.-creare-un-index-per-i-reducers-con-actionreducermap-(3:13)',
  //     'title': '06. creare un index per i reducers con actionReducerMap (3:13)',
  //     'time': '3:13',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484113'
  //   },
  //   {
  //     'id': 361,
  //     'course': 'NgRx',
  //     'idCategory': 43,
  //     'category': 'InvoiceEditor -> Clients: gestione STORE',
  //     'slug': '07.-clients-reducer-(9:11)',
  //     'title': '07. Clients Reducer (9:11)',
  //     'time': '9:11',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484116'
  //   },
  //   {
  //     'id': 362,
  //     'course': 'NgRx',
  //     'idCategory': 43,
  //     'category': 'InvoiceEditor -> Clients: gestione STORE',
  //     'slug': '08.-createfeatureselector-vs-createselector-(4:09)',
  //     'title': '08. createFeatureSelector vs createSelector (4:09)',
  //     'time': '4:09',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484115'
  //   },
  //   {
  //     'id': 363,
  //     'course': 'NgRx',
  //     'idCategory': 43,
  //     'category': 'InvoiceEditor -> Clients: gestione STORE',
  //     'slug': '09.-considerazioni-finali-(2:20)',
  //     'title': '09. Considerazioni finali (2:20)',
  //     'time': '2:20',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11484117'
  //   },
  //   {
  //     'id': 364,
  //     'course': 'NgRx',
  //     'idCategory': 44,
  //     'category': 'InvoiceEditor -> HttpStatus: gestione messaggi "success" e "failed',
  //     'slug': 'goal-(0:50)',
  //     'title': 'Goal (0:50)',
  //     'time': '0:50',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505876'
  //   },
  //   {
  //     'id': 365,
  //     'course': 'NgRx',
  //     'idCategory': 44,
  //     'category': 'InvoiceEditor -> HttpStatus: gestione messaggi "success" e "failed',
  //     'slug': 'introduzione-(3:15)',
  //     'title': 'introduzione (3:15)',
  //     'time': '3:15',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505874'
  //   },
  //   {
  //     'id': 366,
  //     'course': 'NgRx',
  //     'idCategory': 44,
  //     'category': 'InvoiceEditor -> HttpStatus: gestione messaggi "success" e "failed',
  //     'slug': 'httpstatus:-gestione-error-e-success-nello-store-(5:17)',
  //     'title': 'HttpStatus: gestione error e success nello store (5:17)',
  //     'time': '5:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505877'
  //   },
  //   {
  //     'id': 367,
  //     'course': 'NgRx',
  //     'idCategory': 44,
  //     'category': 'InvoiceEditor -> HttpStatus: gestione messaggi "success" e "failed',
  //     'slug': 'considerazioni-su-errori-e-gestione-tramite-http-interceptor-(articolo)',
  //     'title': 'Considerazioni su errori e gestione tramite HTTP Interceptor (articolo)',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11659589'
  //   },
  //   {
  //     'id': 368,
  //     'course': 'NgRx',
  //     'idCategory': 44,
  //     'category': 'InvoiceEditor -> HttpStatus: gestione messaggi "success" e "failed',
  //     'slug': 'httpstatus:-reducer-(6:29)',
  //     'title': 'HttpStatus: reducer (6:29)',
  //     'time': '6:29',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505875'
  //   },
  //   {
  //     'id': 369,
  //     'course': 'NgRx',
  //     'idCategory': 44,
  //     'category': 'InvoiceEditor -> HttpStatus: gestione messaggi "success" e "failed',
  //     'slug': 'httpstatus:-selector-(2:47)',
  //     'title': 'HttpStatus: selector (2:47)',
  //     'time': '2:47',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505873'
  //   },
  //   {
  //     'id': 370,
  //     'course': 'NgRx',
  //     'idCategory': 44,
  //     'category': 'InvoiceEditor -> HttpStatus: gestione messaggi "success" e "failed',
  //     'slug': 'httpstatus-:-ui-e-visualizzazione-errori-(4:51)',
  //     'title': 'HttpStatus : UI e visualizzazione errori (4:51)',
  //     'time': '4:51',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505878'
  //   },
  //   {
  //     'id': 371,
  //     'course': 'NgRx',
  //     'idCategory': 44,
  //     'category': 'InvoiceEditor -> HttpStatus: gestione messaggi "success" e "failed',
  //     'slug': 'httpstatus:-custom-component-(2:31)',
  //     'title': 'HttpStatus: custom component (2:31)',
  //     'time': '2:31',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505880'
  //   },
  //   {
  //     'id': 372,
  //     'course': 'NgRx',
  //     'idCategory': 44,
  //     'category': 'InvoiceEditor -> HttpStatus: gestione messaggi "success" e "failed',
  //     'slug': 'httpstatus:-gestione-messaggi-di-successo-(4:21)',
  //     'title': 'HttpStatus: Gestione messaggi di successo (4:21)',
  //     'time': '4:21',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505879'
  //   },
  //   {
  //     'id': 373,
  //     'course': 'NgRx',
  //     'idCategory': 44,
  //     'category': 'InvoiceEditor -> HttpStatus: gestione messaggi "success" e "failed',
  //     'slug': 'httpstatus:-conclusione-e-riepilogo-(2:47)',
  //     'title': 'HttpStatus: conclusione e riepilogo (2:47)',
  //     'time': '2:47',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505881'
  //   },
  //   {
  //     'id': 374,
  //     'course': 'NgRx',
  //     'idCategory': 45,
  //     'category': 'InvoiceEditor -> ui -> sync user interface with store',
  //     'slug': '1.-goal-(1:40)',
  //     'title': '1. GOAL (1:40)',
  //     'time': '1:40',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505882'
  //   },
  //   {
  //     'id': 375,
  //     'course': 'NgRx',
  //     'idCategory': 45,
  //     'category': 'InvoiceEditor -> ui -> sync user interface with store',
  //     'slug': '2.-ui-state-(3:17)',
  //     'title': '2. UI state (3:17)',
  //     'time': '3:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505883'
  //   },
  //   {
  //     'id': 376,
  //     'course': 'NgRx',
  //     'idCategory': 45,
  //     'category': 'InvoiceEditor -> ui -> sync user interface with store',
  //     'slug': '3.-ui-actions-(1:04)',
  //     'title': '3. UI Actions (1:04)',
  //     'time': '1:04',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505884'
  //   },
  //   {
  //     'id': 377,
  //     'course': 'NgRx',
  //     'idCategory': 45,
  //     'category': 'InvoiceEditor -> ui -> sync user interface with store',
  //     'slug': '4.-ui-reducers-(5:18)',
  //     'title': '4. UI Reducers (5:18)',
  //     'time': '5:18',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505886'
  //   },
  //   {
  //     'id': 378,
  //     'course': 'NgRx',
  //     'idCategory': 45,
  //     'category': 'InvoiceEditor -> ui -> sync user interface with store',
  //     'slug': '5.-ui-selectors-(7:58)',
  //     'title': '5. UI Selectors (7:58)',
  //     'time': '7:58',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505885'
  //   },
  //   {
  //     'id': 379,
  //     'course': 'NgRx',
  //     'idCategory': 45,
  //     'category': 'InvoiceEditor -> ui -> sync user interface with store',
  //     'slug': '6.-ui:-gestione-apertura-/-chiusura-pannelli-(7:24)',
  //     'title': '6. UI: gestione apertura / chiusura pannelli (7:24)',
  //     'time': '7:24',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11505887'
  //   },
  //   {
  //     'id': 380,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '01.-goal-(0:55)',
  //     'title': '01. GOAL (0:55)',
  //     'time': '0:55',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11547920'
  //   },
  //   {
  //     'id': 381,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '03.-invoice-model-(modello-fattura)-(1:51)',
  //     'title': '03. Invoice Model (modello fattura) (1:51)',
  //     'time': '1:51',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11520442'
  //   },
  //   {
  //     'id': 382,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '04.-invoices-actions-(8:49)',
  //     'title': '04. Invoices Actions (8:49)',
  //     'time': '8:49',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11520543'
  //   },
  //   {
  //     'id': 383,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '05.-invoice-form:-versione-provvisoria-(7:57)',
  //     'title': '05. Invoice Form: versione provvisoria (7:57)',
  //     'time': '7:57',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11520642'
  //   },
  //   {
  //     'id': 384,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '06.-inizializzazione-stato-"invoices"-(4:55)',
  //     'title': '06. Inizializzazione stato "invoices" (4:55)',
  //     'time': '4:55',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11520966'
  //   },
  //   {
  //     'id': 385,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '07.-selectors-per-le-fatture-&-getactiveinvoice-(2:16)',
  //     'title': '07. Selectors per le fatture & getActiveInvoice (2:16)',
  //     'time': '2:16',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11520956'
  //   },
  //   {
  //     'id': 386,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '08.-effects-condizionali-e-operatore-rxjs-"withlatestfrom"-(10:05)',
  //     'title': '08. Effects condizionali e operatore RxJS "withLatestFrom" (10:05)',
  //     'time': '10:05',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11520934'
  //   },
  //   {
  //     'id': 387,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '09.-invoices-http-service-(3:05)',
  //     'title': '09. Invoices http service (3:05)',
  //     'time': '3:05',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529067'
  //   },
  //   {
  //     'id': 388,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '10.-concatenare-effects-(5:14)',
  //     'title': '10. Concatenare effects (5:14)',
  //     'time': '5:14',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529066'
  //   },
  //   {
  //     'id': 389,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '11.-emettere-azioni-multiple-negli-effetti-(4:18)',
  //     'title': '11. Emettere azioni multiple negli effetti (4:18)',
  //     'time': '4:18',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529068'
  //   },
  //   {
  //     'id': 390,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '12.-reducer-update:-gestione-activeinvoice-e-addinvoice-(4:28)',
  //     'title': '12. Reducer update: gestione activeInvoice e addInvoice (4:28)',
  //     'time': '4:28',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529069'
  //   },
  //   {
  //     'id': 391,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '13.-initializzazione-invoice-editor-e-gestione-xhr-simultanee-(17:21)',
  //     'title': '13. Initializzazione invoice editor e gestione xhr simultanee (17:21)',
  //     'time': '17:21',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529071'
  //   },
  //   {
  //     'id': 392,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '14.-ui:-visualizzazione-fatture-e-gestione-fattura-attiva-(9:35)',
  //     'title': '14. UI: visualizzazione fatture e gestione fattura attiva (9:35)',
  //     'time': '9:35',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529072'
  //   },
  //   {
  //     'id': 393,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '15.-ui:-animare-il-layout-sulla-base-dell\'apertura-pannelli-(7:13)',
  //     'title': '15. UI: animare il layout sulla base dell\'apertura pannelli (7:13)',
  //     'time': '7:13',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529074'
  //   },
  //   {
  //     'id': 394,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '16.-selectors,-reduce-ed-espressioni:-calcolo-numero-fattura-progressivo-(11:52)',
  //     'title': '16. Selectors, reduce ed espressioni: calcolo numero fattura progressivo (11:52)',
  //     'time': '11:52',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529075'
  //   },
  //   {
  //     'id': 395,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '17.-creare-una-nuova-fattura-(3:45)',
  //     'title': '17. Creare una nuova fattura (3:45)',
  //     'time': '3:45',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529073'
  //   },
  //   {
  //     'id': 396,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '18.-modificare-una-fattura-(17:34)',
  //     'title': '18. Modificare una fattura (17:34)',
  //     'time': '17:34',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529079'
  //   },
  //   {
  //     'id': 397,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '19.-cancellare-una-fattura-(5:53)',
  //     'title': '19. Cancellare una fattura (5:53)',
  //     'time': '5:53',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529076'
  //   },
  //   {
  //     'id': 398,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '20.-bug-fix:-delete-vs-setactive-(5:18)',
  //     'title': '20. bug fix: delete vs setActive (5:18)',
  //     'time': '5:18',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529077'
  //   },
  //   {
  //     'id': 399,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '21.-aggiungere-un-campo-"date"-alla-fattura-(2:15)',
  //     'title': '21. Aggiungere un campo "Date" alla fattura (2:15)',
  //     'time': '2:15',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11529078'
  //   },
  //   {
  //     'id': 400,
  //     'course': 'NgRx',
  //     'idCategory': 46,
  //     'category': 'InvoiceEditor -> Invoices: gestione fatture (advanced tricks)',
  //     'slug': '22.-ui:-migliorare-il-layout-del-pannello-clienti-(4:20)',
  //     'title': '22. UI: migliorare il layout del-pannello clienti (4:20)',
  //     'time': '4:20',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11632752'
  //   },
  //   {
  //     'id': 401,
  //     'course': 'NgRx',
  //     'idCategory': 47,
  //     'category': 'InvoiceApp -> InvoiceEditor: Reactive Forms',
  //     'slug': '1.-introduzione-al-capitolo',
  //     'title': '1. Introduzione al capitolo',
  //     'time': '00:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11534939'
  //   },
  //   {
  //     'id': 402,
  //     'course': 'NgRx',
  //     'idCategory': 47,
  //     'category': 'InvoiceApp -> InvoiceEditor: Reactive Forms',
  //     'slug': '3.-migliorare-il-layout-del-form-(15:14)',
  //     'title': '3. Migliorare il layout del form (15:14)',
  //     'time': '15:14',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11533242'
  //   },
  //   {
  //     'id': 403,
  //     'course': 'NgRx',
  //     'idCategory': 47,
  //     'category': 'InvoiceApp -> InvoiceEditor: Reactive Forms',
  //     'slug': '4.-aprire-i-pannelli-clienti-e-dello-storico-fatture-(6:00)',
  //     'title': '4. Aprire i pannelli clienti e dello storico fatture (6:00)',
  //     'time': '6:00',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11533245'
  //   },
  //   {
  //     'id': 404,
  //     'course': 'NgRx',
  //     'idCategory': 47,
  //     'category': 'InvoiceApp -> InvoiceEditor: Reactive Forms',
  //     'slug': '5.-da-"template-driven-forms"-ai-reactive-forms-(6:34)',
  //     'title': '5. Da "template-driven forms" ai Reactive Forms (6:34)',
  //     'time': '6:34',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11533244'
  //   },
  //   {
  //     'id': 405,
  //     'course': 'NgRx',
  //     'idCategory': 47,
  //     'category': 'InvoiceApp -> InvoiceEditor: Reactive Forms',
  //     'slug': '6:-component-lifecycle:-ngonchanges-(6:51)',
  //     'title': '6: Component lifecycle: ngOnChanges (6:51)',
  //     'time': '6:51',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11533241'
  //   },
  //   {
  //     'id': 406,
  //     'course': 'NgRx',
  //     'idCategory': 47,
  //     'category': 'InvoiceApp -> InvoiceEditor: Reactive Forms',
  //     'slug': '7.-reactiveforms:-metodi-patchvalue-and-reset-(1:54)',
  //     'title': '7. ReactiveForms: metodi patchValue and reset (1:54)',
  //     'time': '1:54',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11533240'
  //   },
  //   {
  //     'id': 407,
  //     'course': 'NgRx',
  //     'idCategory': 47,
  //     'category': 'InvoiceApp -> InvoiceEditor: Reactive Forms',
  //     'slug': '8.-formarray:-gestione-prodotti-fattura---part-1-(9:17)',
  //     'title': '8. FormArray: gestione prodotti fattura - part 1 (9:17)',
  //     'time': '9:17',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11533243'
  //   },
  //   {
  //     'id': 408,
  //     'course': 'NgRx',
  //     'idCategory': 47,
  //     'category': 'InvoiceApp -> InvoiceEditor: Reactive Forms',
  //     'slug': '9.-formarray:-gestione-prodotti-fattura---part-2-(14:28)',
  //     'title': '9. FormArray: gestione prodotti fattura - part 2 (14:28)',
  //     'time': '14:28',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11567392'
  //   },
  //   {
  //     'id': 409,
  //     'course': 'NgRx',
  //     'idCategory': 47,
  //     'category': 'InvoiceApp -> InvoiceEditor: Reactive Forms',
  //     'slug': '10.-formarray:-gestione-prodotti-fattura---part-3-(3:35)',
  //     'title': '10. FormArray: gestione prodotti fattura - part 3 (3:35)',
  //     'time': '3:35',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11567394'
  //   },
  //   {
  //     'id': 410,
  //     'course': 'NgRx',
  //     'idCategory': 47,
  //     'category': 'InvoiceApp -> InvoiceEditor: Reactive Forms',
  //     'slug': '11.-formarray:-calcolo-totale-prodotti-(8:02)',
  //     'title': '11. FormArray: calcolo totale prodotti (8:02)',
  //     'time': '8:02',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11534269'
  //   },
  //   {
  //     'id': 411,
  //     'course': 'NgRx',
  //     'idCategory': 47,
  //     'category': 'InvoiceApp -> InvoiceEditor: Reactive Forms',
  //     'slug': '12.-formarray:-selezione-clienti-(8:01)',
  //     'title': '12. FormArray: selezione clienti (8:01)',
  //     'time': '8:01',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11533239'
  //   },
  //   {
  //     'id': 412,
  //     'course': 'NgRx',
  //     'idCategory': 48,
  //     'category': 'Miglioramenti-best-practices-and-fix',
  //     'slug': '01.-routing-redirect-(0:45)',
  //     'title': '01. Routing Redirect (0:45)',
  //     'time': '0:45',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11541660'
  //   },
  //   {
  //     'id': 413,
  //     'course': 'NgRx',
  //     'idCategory': 48,
  //     'category': 'Miglioramenti-best-practices-and-fix',
  //     'slug': '02.-aggiungere-immagini-al-progetto-(2:42)',
  //     'title': '02. Aggiungere immagini al progetto (2:42)',
  //     'time': '2:42',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11541661'
  //   },
  //   {
  //     'id': 414,
  //     'course': 'NgRx',
  //     'idCategory': 48,
  //     'category': 'Miglioramenti-best-practices-and-fix',
  //     'slug': '03.-ottimizzazione-performance-con-la-changedetectionstrategy-"onpush"-(5:33)',
  //     'title': '03. Ottimizzazione performance con la ChangeDetectionStrategy "onPush" (5:33)',
  //     'time': '5:33',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11541663'
  //   },
  //   {
  //     'id': 415,
  //     'course': 'NgRx',
  //     'idCategory': 48,
  //     'category': 'Miglioramenti-best-practices-and-fix',
  //     'slug': '04.-tip:-barrel-index-file:-import-/-export-modules-(6:31)',
  //     'title': '04. TIP: barrel index file: import / export modules (6:31)',
  //     'time': '6:31',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11541662'
  //   },
  //   {
  //     'id': 416,
  //     'course': 'NgRx',
  //     'idCategory': 48,
  //     'category': 'Miglioramenti-best-practices-and-fix',
  //     'slug': '05.-miglioramento-performance:-sottoscrizione-manuale-agli-observable-vs-async-(ngif-as)-(3:34)',
  //     'title': '05. Miglioramento Performance: sottoscrizione manuale agli observable vs async (ngif-as) (3:34)',
  //     'time': '3:34',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11541664'
  //   },
  //   {
  //     'id': 417,
  //     'course': 'NgRx',
  //     'idCategory': 49,
  //     'category': 'Stampa Fattura',
  //     'slug': '01.-nested-routes-&-multiple-containers-(7:46)',
  //     'title': '01. Nested Routes & multiple Containers (7:46)',
  //     'time': '7:46',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11541764'
  //   },
  //   {
  //     'id': 418,
  //     'course': 'NgRx',
  //     'idCategory': 49,
  //     'category': 'Stampa Fattura',
  //     'slug': '02.-selettori-compositi-(6:40)',
  //     'title': '02. Selettori Compositi (6:40)',
  //     'time': '6:40',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11541763'
  //   },
  //   {
  //     'id': 419,
  //     'course': 'NgRx',
  //     'idCategory': 49,
  //     'category': 'Stampa Fattura',
  //     'slug': '03.-router:-back-action-(2:11)',
  //     'title': '03. Router: back action (2:11)',
  //     'time': '2:11',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11541761'
  //   },
  //   {
  //     'id': 420,
  //     'course': 'NgRx',
  //     'idCategory': 49,
  //     'category': 'Stampa Fattura',
  //     'slug': '04.-css-tip:-print-media-query-&-angular-css-viewencapsulation-(3:54)',
  //     'title': '04. CSS TIP: print media query & Angular CSS ViewEncapsulation (3:54)',
  //     'time': '3:54',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11541760'
  //   },
  //   {
  //     'id': 421,
  //     'course': 'NgRx',
  //     'idCategory': 49,
  //     'category': 'Stampa Fattura',
  //     'slug': '05.-visualizzazione-dati-e-stampa-(10:35)',
  //     'title': '05. Visualizzazione dati e stampa (10:35)',
  //     'time': '10:35',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11541762'
  //   },
  //   {
  //     'id': 422,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '1.-configurazione-modulo-"root"-vs-module-"core"-(0:36)',
  //     'title': '1. Configurazione modulo "root" vs module "core" (0:36)',
  //     'time': '0:36',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542397'
  //   },
  //   {
  //     'id': 423,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '2.-runtime-checks-&-immutabilità-(2:24)',
  //     'title': '2. Runtime checks & immutabilità (2:24)',
  //     'time': '2:24',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542503'
  //   },
  //   {
  //     'id': 424,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '3.-store-"forroot"-vs-"forfeature"-(1:58)',
  //     'title': '3. Store "forRoot" vs "forFeature" (1:58)',
  //     'time': '1:58',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542505'
  //   },
  //   {
  //     'id': 425,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '4.-store-type-&-actionreducermap-(2:10)',
  //     'title': '4. Store Type & actionReducerMap (2:10)',
  //     'time': '2:10',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542757'
  //   },
  //   {
  //     'id': 426,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '10.-reducer-&-sintassi-js-per-restituire-oggetti-in-un-reducer-(1:08)',
  //     'title': '10. Reducer & sintassi JS per restituire oggetti in un reducer (1:08)',
  //     'time': '1:08',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542395'
  //   },
  //   {
  //     'id': 427,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '11.-reducer-&-problemi-di-compilazione-aot-(1:33)',
  //     'title': '11. Reducer & problemi di compilazione AOT (1:33)',
  //     'time': '1:33',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542396'
  //   },
  //   {
  //     'id': 428,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '20.-actions:-passare-la-minore-quantità-di-informazioni-nel-payload-(4:07)',
  //     'title': '20. Actions: passare la minore quantità di informazioni nel payload (4:07)',
  //     'time': '4:07',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542502'
  //   },
  //   {
  //     'id': 429,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '33.-selectors:-sommario-(4:37)',
  //     'title': '33. Selectors: sommario (4:37)',
  //     'time': '4:37',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542504'
  //   },
  //   {
  //     'id': 430,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '34.-effects:-sommario-(2:12)',
  //     'title': '34. Effects: sommario (2:12)',
  //     'time': '2:12',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542753'
  //   },
  //   {
  //     'id': 431,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '35.-rxjs-tip:-switchmap-vs-exhaustmap-vs-concatmap-vs-mergemap-(2:29)',
  //     'title': '35. RXJS TIP: switchmap vs exhaustmap vs concatmap vs mergemap (2:29)',
  //     'time': '2:29',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542756'
  //   },
  //   {
  //     'id': 432,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '36.-effects:-recuperare-lo-stato-con-withlatestfrom-(2:15)',
  //     'title': '36. Effects: recuperare lo stato con withLatestFrom (2:15)',
  //     'time': '2:15',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542754'
  //   },
  //   {
  //     'id': 433,
  //     'course': 'NgRx',
  //     'idCategory': 50,
  //     'category': 'EXTRA: NGRX tips & tricks',
  //     'slug': '37.-effects:-dispatch-multiple-actions-(2:51)',
  //     'title': '37. Effects: dispatch multiple actions (2:51)',
  //     'time': '2:51',
  //     'url': 'https://fabiobiondi.teachable.com/courses/630974/lectures/11542755'
  //   }
  // ];
  //
  // items: any;

  constructor(private router: Router) {}

  // arrayToObject = (array, keyField) =>
  //   array.reduce((obj, item) => {
  //     obj[item[keyField]] = item;
  //     return obj;
  //   }, {})

  ngOnInit() {
    const navigationStart$ = this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      mapTo(true)
    );

    const navigationEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      mapTo(false)
    );

    this.loading$ = merge(navigationStart$, navigationEnd$);
  }
}
