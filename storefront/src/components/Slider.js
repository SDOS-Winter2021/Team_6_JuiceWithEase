import React from 'react';
import '../assets/css/slider.css';


function Slider() {
    return (
        <div class="site-outer">
            <div class="site-inner">
                <section class="container-fluid">
                    <div class="row">
                            <ul class="accordion-group" id="accordion">
                                <li Style="background-image: url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');">
                                    <div class="accordion-overlay"></div>
                                    <h3>Rustic</h3>
                                    <section class="hidden-xs">
                                        <article>
                                            <p>Rual and rustic</p>
                                        </article>
                                    </section>
                                </li>
                                <li class="out" Style="background-image: url('https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80');">
                                    <div class="accordion-overlay"></div>
                                    <h3>Clean</h3>
                                    <section class="hidden-xs">
                                        <article>
                                            <p>For the single or couple
                                            </p>
                                        </article>
                                    </section>
                                </li>
                                <li Style="background-image: url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80');">
                                    <div class="accordion-overlay"></div>
                                    <h3>Stylish</h3>
                                    <section class="hidden-xs">
                                        <article>
                                            <p>When people want it cosy but stylish</p>
                                        </article>
                                    </section>
                                </li>
                                <li Style="background-image: url('https://images.unsplash.com/photo-1495433324511-bf8e92934d90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');">
                                    <div class="accordion-overlay"></div>
                                    <h3>Family</h3>
                                    <section class="hidden-xs">
                                        <article>
                                            <p>For the family dinner</p>
                                        </article>
                                    </section>
                                </li>
                            </ul>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Slider
