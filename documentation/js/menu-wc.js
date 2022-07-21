'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-graphql documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MainModule.html" data-type="entity-link" >MainModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PetsCoreModule.html" data-type="entity-link" >PetsCoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PetsCoreModule-b3fdb1aa1a277c5ca3da23d9efa52e0f9d1087bae04b75fe1496dadb1afa9203655c76a5c32c3f1313e4e2cd79b179fe75d736429df99c8d14a60d88109ef32c"' : 'data-target="#xs-injectables-links-module-PetsCoreModule-b3fdb1aa1a277c5ca3da23d9efa52e0f9d1087bae04b75fe1496dadb1afa9203655c76a5c32c3f1313e4e2cd79b179fe75d736429df99c8d14a60d88109ef32c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PetsCoreModule-b3fdb1aa1a277c5ca3da23d9efa52e0f9d1087bae04b75fe1496dadb1afa9203655c76a5c32c3f1313e4e2cd79b179fe75d736429df99c8d14a60d88109ef32c"' :
                                        'id="xs-injectables-links-module-PetsCoreModule-b3fdb1aa1a277c5ca3da23d9efa52e0f9d1087bae04b75fe1496dadb1afa9203655c76a5c32c3f1313e4e2cd79b179fe75d736429df99c8d14a60d88109ef32c"' }>
                                        <li class="link">
                                            <a href="injectables/PetsCore.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetsCore</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PetsResolverModule.html" data-type="entity-link" >PetsResolverModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PetsServiceModule.html" data-type="entity-link" >PetsServiceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PetsServiceModule-08a0792725462ea8a4a261228ee57f06f6718722d4972c184a8ea9e198aa0b47e70281e4d3a3e44665327e2c4d07e2b12ffc0bf63e739cd2454a78e88921ef22"' : 'data-target="#xs-injectables-links-module-PetsServiceModule-08a0792725462ea8a4a261228ee57f06f6718722d4972c184a8ea9e198aa0b47e70281e4d3a3e44665327e2c4d07e2b12ffc0bf63e739cd2454a78e88921ef22"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PetsServiceModule-08a0792725462ea8a4a261228ee57f06f6718722d4972c184a8ea9e198aa0b47e70281e4d3a3e44665327e2c4d07e2b12ffc0bf63e739cd2454a78e88921ef22"' :
                                        'id="xs-injectables-links-module-PetsServiceModule-08a0792725462ea8a4a261228ee57f06f6718722d4972c184a8ea9e198aa0b47e70281e4d3a3e44665327e2c4d07e2b12ffc0bf63e739cd2454a78e88921ef22"' }>
                                        <li class="link">
                                            <a href="injectables/PetsCore.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetsCore</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PetsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PinoLoggerModule.html" data-type="entity-link" >PinoLoggerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PostgresModule.html" data-type="entity-link" >PostgresModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePetInputDto.html" data-type="entity-link" >CreatePetInputDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterPetDto.html" data-type="entity-link" >FilterPetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindAndCountAllPetResponseDto.html" data-type="entity-link" >FindAndCountAllPetResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOneFilterPetDto.html" data-type="entity-link" >FindOneFilterPetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GqlResponseDto.html" data-type="entity-link" >GqlResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pet.html" data-type="entity-link" >Pet</a>
                            </li>
                            <li class="link">
                                <a href="classes/PetsResolver.html" data-type="entity-link" >PetsResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePetInputDto.html" data-type="entity-link" >UpdatePetInputDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/GqlResponse.html" data-type="entity-link" >GqlResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFindAndCountAll.html" data-type="entity-link" >IFindAndCountAll</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOptionalPet.html" data-type="entity-link" >IOptionalPet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPet.html" data-type="entity-link" >IPet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});