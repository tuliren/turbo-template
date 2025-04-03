import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './button';

describe('Button component', () => {
  it('renders with the provided text', () => {
    render(<Button appName="Test App">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('includes the provided className', () => {
    render(
      <Button appName="Test App" className="test-class">
        Click me
      </Button>
    );
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('test-class');
  });
});
