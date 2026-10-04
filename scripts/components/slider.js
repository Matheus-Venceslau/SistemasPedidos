export function initializeSlider(abrirModal) {

    const cards = [
        ...document.querySelectorAll(
            ".card-menu-highlights"
        )
    ];

    const previousButton =
        document.querySelector(
            ".slider-arrow-left"
        );

    const nextButton =
        document.querySelector(
            ".slider-arrow-right"
        );

    const indicators = [
        ...document.querySelectorAll(
            ".slider-indicator"
        )
    ];

    let selectedIndex = 1;


    // ==========================================
    // RENDERIZAR SLIDER
    // ==========================================

    function renderSlider() {

        const totalCards =
            cards.length;


        cards.forEach(
            (card, index) => {

                const position =
                    (
                        index -
                        selectedIndex +
                        totalCards
                    ) % totalCards;


                card.classList.remove(
                    "position-left",
                    "position-center",
                    "position-right",
                    "position-hidden"
                );


                if (position === 0) {

                    card.classList.add(
                        "position-center"
                    );

                } else if (position === 1) {

                    card.classList.add(
                        "position-right"
                    );

                } else if (
                    position ===
                    totalCards - 1
                ) {

                    card.classList.add(
                        "position-left"
                    );

                } else {

                    card.classList.add(
                        "position-hidden"
                    );
                }
            }
        );


        // ==========================================
        // ATUALIZAR INDICADORES
        // ==========================================

        indicators.forEach(
            (indicator, index) => {

                indicator.classList.toggle(
                    "active",
                    index === selectedIndex
                );
            }
        );
    }


    // ==========================================
    // SELECIONAR CARD
    // ==========================================

    function selectCard(index) {

        const totalCards =
            cards.length;


        selectedIndex =
            (
                index +
                totalCards
            ) % totalCards;


        renderSlider();
    }


    // ==========================================
    // PRÓXIMO SLIDE
    // ==========================================

    function nextSlide() {

        selectCard(
            selectedIndex + 1
        );
    }


    // ==========================================
    // SLIDE ANTERIOR
    // ==========================================

    function previousSlide() {

        selectCard(
            selectedIndex - 1
        );
    }


    // ==========================================
    // BOTÃO ANTERIOR
    // ==========================================

    previousButton.addEventListener(
        "click",
        previousSlide
    );


    // ==========================================
    // BOTÃO PRÓXIMO
    // ==========================================

    nextButton.addEventListener(
        "click",
        nextSlide
    );


    // ==========================================
    // EVENTOS DOS CARDS
    // ==========================================

    cards.forEach(
        (card, index) => {

            card.addEventListener(
                "click",
                (event) => {

                    // ==========================================
                    // BOTÃO "ADICIONAR"
                    // ==========================================

                    if (
                        event.target.closest(
                            ".dish-cart"
                        )
                    ) {

                        /*
                         * O botão só funciona
                         * no card central.
                         */

                        if (
                            index ===
                            selectedIndex
                        ) {

                            const productId =
                                Number(
                                    card.dataset
                                        .productId
                                );


                            abrirModal(
                                productId
                            );
                        }


                        return;
                    }


                    // ==========================================
                    // CARD LATERAL
                    // ==========================================

                    if (
                        index !==
                        selectedIndex
                    ) {

                        selectCard(index);

                        return;
                    }


                    // ==========================================
                    // CARD CENTRAL
                    // ==========================================

                    const productId =
                        Number(
                            card.dataset
                                .productId
                        );


                    abrirModal(
                        productId
                    );
                }
            );
        }
    );


    // ==========================================
    // INDICADORES
    // ==========================================

    indicators.forEach(
        (indicator, index) => {

            indicator.addEventListener(
                "click",
                () => {

                    selectCard(index);
                }
            );
        }
    );


    // ==========================================
    // INICIALIZAR
    // ==========================================

    renderSlider();


    return {

        getSelectedIndex() {

            return selectedIndex;
        }
    };
}
