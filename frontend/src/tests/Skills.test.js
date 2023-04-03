import React from 'react';
import { render, screen } from '@testing-library/react';
import Skills from '../Components/ProfilePage/Skills';

describe('Skills', () => {
  const mockProfile = {
    searcher: {
      skills: ['React,3,months', 'JavaScript,2,years']
    }
  };

  it('renders the skills', async () => {
    render(<Skills profile={mockProfile} />);
    const skills = await screen.findAllByRole('textbox');
    expect(skills).toHaveLength(2);
    expect(skills[0]).toHaveValue('React');
    expect(skills[1]).toHaveValue('JavaScript');
  });

});
