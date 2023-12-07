import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import {withStore} from '../../utils/mock-component.tsx';
import {makeFakeBriefOffer, makeFakeCity} from '../../utils/mocks.ts';
import OfferList from './offer-list.tsx';

describe('Component: OfferList', () => {
  it('should render correct number of offers', () => {
    const selectedCity = makeFakeCity();
    const fakeOffers = Array.from({ length: 6 }, () => makeFakeBriefOffer());
    fakeOffers.forEach((offer) => {
      offer.city = selectedCity;
    });
    const maxOfferLimit = 3;
    const { withStoreComponent } = withStore(
      <OfferList
        offers={fakeOffers}
        selectedCity={selectedCity}
        maxOfferLimit={maxOfferLimit}
      />
    );
    render(withStoreComponent, { wrapper: MemoryRouter });

    const offerElements = screen.getAllByText(/€/);
    expect(offerElements).toHaveLength(maxOfferLimit);
    expect(screen.getByText(`${fakeOffers.length} places to stay in ${selectedCity.name}`)).toBeInTheDocument();
  });
});


