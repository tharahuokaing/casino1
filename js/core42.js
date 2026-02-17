/**
 * 🃏 HUOKAING THARA: CORE-42 (DECK ENGINE)
 * Feature: Cryptographic Shuffling & Card State Management
 * Version: 4.0.0
 */

(function(Imperial) {
    const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    class Deck {
        constructor(deckCount = 1) {
            this.cards = [];
            this.deckCount = deckCount;
            this.generate();
        }

        generate() {
            this.cards = [];
            for (let i = 0; i < this.deckCount; i++) {
                SUITS.forEach(suit => {
                    VALUES.forEach(value => {
                        this.cards.push({ suit, value, id: `${value}-${suit}-${i}` });
                    });
                });
            }
        }

        /**
         * shuffle: Uses Core-30 RNG to perform a Fisher-Yates shuffle
         */
        async shuffle() {
            for (let i = this.cards.length - 1; i > 0; i--) {
                const randomRatio = await Imperial.RNG.generateResult();
                const j = Math.floor(randomRatio * (i + 1));
                [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
            }
            Imperial.Logger.log("GAME", `Deck shuffled (${this.cards.length} cards)`);
        }

        draw() {
            if (this.cards.length === 0) return null;
            const card = this.cards.pop();
            Imperial.Events.emit('CARD_DRAWN', { card, remaining: this.cards.length });
            return card;
        }
    }

    const DeckEngine = {
        create: (count) => new Deck(count),
        
        // Helper to calculate Blackjack hand value
        calculateHand: function(hand) {
            let total = 0;
            let aces = 0;
            hand.forEach(card => {
                if (card.value === 'A') {
                    aces += 1;
                    total += 11;
                } else if (['J', 'Q', 'K'].includes(card.value)) {
                    total += 10;
                } else {
                    total += parseInt(card.value);
                }
            });
            while (total > 21 && aces > 0) {
                total -= 10;
                aces -= 1;
            }
            return total;
        }
    };

    Imperial.Cards = DeckEngine;
    Imperial.Kernel.registerModule("core42_deck_engine");

})(window.Imperial);
