import Image from 'next/image';

import { Button } from '@/components/Button';
import Underline from '@/components/Underline';
import airbyteLogo from '@/images/logos/airbyte.svg';
import benchlingLogo from '@/images/logos/benchling.svg';
import duckyLogo from '@/images/logos/ducky.svg';
import liverampLogo from '@/images/logos/liveramp.svg';
import scaleLogo from '@/images/logos/scale.svg';

const CompanyGroups = [
  { name: 'LiveRamp', logo: liverampLogo, height: 30 },
  { name: 'Scale', logo: scaleLogo, height: 38 },
  { name: 'Airbyte', logo: airbyteLogo, height: 54 },
  { name: 'Ducky', logo: duckyLogo, height: 40 },
  {
    name: 'Benchling',
    logo: benchlingLogo,
    height: 45,
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="flex min-h-[80vh] flex-col justify-start pb-16 pt-[20vh] text-center"
    >
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium leading-tight tracking-tight text-slate-700 sm:text-7xl sm:leading-tight">
        Start <Underline text="dream project" /> with one click
      </h1>
      <p className="mx-auto mt-10 max-w-2xl text-xl tracking-tight text-slate-500">
        This is a Turbo project template including everything you need to build your dream project.
      </p>
      <div className="mt-14 flex justify-center gap-x-6">
        <Button href="#" color="slate" variant="solid">
          Coming soon
        </Button>
      </div>

      <div className="mt-36 sm:mt-28 lg:mb-8 lg:mt-44">
        <p className="text-xl tracking-tight text-slate-500">Brought to you by folks from</p>
        <ul
          role="list"
          className="mt-8 grid grid-cols-2 gap-x-8 sm:flex sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-10 xl:flex xl:flex-row xl:gap-x-12 xl:gap-y-0"
        >
          {CompanyGroups.map((company) => (
            <li key={company.name} className="flex items-center justify-center">
              <Image
                src={company.logo}
                height={company.height * 1.2}
                alt={company.name}
                unoptimized
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
