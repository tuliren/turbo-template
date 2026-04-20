import { Center, Container, Loader } from '@mantine/core';
import { FC } from 'react';

interface LoadingPanelProps {}

const LoadingPanel: FC<LoadingPanelProps> = ({}) => {
  return (
    <Container>
      <Center>
        <Loader />
      </Center>
    </Container>
  );
};

export default LoadingPanel;
