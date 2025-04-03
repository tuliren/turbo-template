import { render } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  it('renders with the provided text', () => {
    const { getByText } = render(<Button appName="Test App">Click me</Button>);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('includes the provided className', () => {
    const { container } = render(
      <Button appName="Test App" className="test-class">
        Click me
      </Button>
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('test-class');
  });
});
