import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SkillCard from '../Components/ProfilePage/SkillCard';

describe('SkillCard', () => {
  test('renders SkillCard correctly', () => {
    const props = {
      id: '1',
      skill: 'React',
      duration: '6',
      interval: 'months'
    };
    render(<SkillCard {...props} />);
  });

  test('renders correctly with props', () => {
    const props = {
      id: '1',
      skill: 'React',
      duration: '6',
      interval: 'months'
    };
    const { getByPlaceholderText, getByText, getByRole } = render(<SkillCard {...props} />);
    const skillInput = getByPlaceholderText('Skill');
    const durationInput = getByPlaceholderText('Duration');
    const intervalSelect = getByText('Month/s');
    const deleteButton = getByRole('button', {class:"delete w-[24%]"});

    expect(skillInput).toBeInTheDocument();
    expect(skillInput).toHaveValue(props.skill);
    expect(durationInput).toBeInTheDocument();
    expect(intervalSelect).toBeInTheDocument();
    expect(intervalSelect).toHaveValue(props.interval);
    expect(deleteButton).toBeInTheDocument();
  });


  test('shows error message when there is a comma in skill name', () => {
    const props = {
      id: '1',
      skill: 'React,JS',
      duration: '6',
      interval: 'months'
    };
    const { getByPlaceholderText, getByText } = render(<SkillCard {...props} />);
    const skillInput = getByPlaceholderText('Skill');
    expect(skillInput).toHaveValue(props.skill);

    fireEvent.change(skillInput, { target: { value: 'ReactJS' } });

    expect(skillInput).toHaveValue('ReactJS');
    expect(screen.queryByTestId('Error'));
  });

  test('does not show error message when skill name is valid', () => {
    const props = {
      id: '1',
      skill: 'ReactJS',
      duration: '6',
      interval: 'months'
    };

    const { getByPlaceholderText } = render(<SkillCard {...props} />);
    const skillInput = getByPlaceholderText('Skill');
    expect(skillInput).toHaveValue(props.skill);

    fireEvent.change(skillInput, { target: { value: 'React,JS' } });

    expect(skillInput).toHaveValue('React,JS');
  });
});
