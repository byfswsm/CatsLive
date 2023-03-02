import { render, screen } from '@testing-library/react';
import React from 'react'

import userEvent from '@testing-library/user-event'

test('renders learn react link', () => {
  render(<select
    className="border border-[#E0E0E0] rounded-md bg-white w-52 px-2 py-1"
    id="team"
    name="team"
    //value={filters.bedrooms}
    onChange={(e) =>
      setFilters({ ...filters, bedrooms: e.target.value })
    }
  >
    <option value="All">All</option>
    <option value="1">1 or more</option>
    <option value="2">2 or more</option>
    <option value="3">3 or more</option>
    <option value="4">4 or more</option>
  </select>);
  userEvent.selectOptions(screen.getByRole('combobox'), ['3'])
  expect(screen.getByRole('option', { name: '3 or more' }).selected).toBe(false)
});
