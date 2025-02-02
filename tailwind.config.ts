import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'white': '#ffffff',
        'black': '#000000',
        'primary': '#512da8',
        'secondary': '#000000',
        'red': {
            '050': '#f9eeee',
            '100': '#f8e1de',
            '200': '#f7bbb1',
            '300': '#f2938c',
            '400': '#e9695f',
            '500': '#d83933',
            '600': '#a23737',
            '700': '#6f3331',
            '800': '#3e2927',
            '900': '#1b1616',
        },
        'red-warm': {
            '050': '#f6efea',
            '100': '#f4e3db',
            '200': '#ecc0a7',
            '300': '#dca081',
            '400': '#d27a56',
            '500': '#c3512c',
            '600': '#805039',
            '700': '#524236',
            '800': '#332d29',
            '900': '#1f1c18',
        },
        'red-warm-vivid': {
            '200': '#f6bd9c',
            '300': '#f39268',
            '400': '#ee601d',
            '500': '#d63e04',
        },
        'red-cool': {
            '050': '#f8eff1 ',
            '100': '#f3e1e4',
            '200': '#ecbec6',
            '300': '#e09aa6',
            '400': '#e16b80',
            '500': '#cd425b',
            '600': '#9e394b',
            '700': '#68363f',
            '800': '#40282c',
            '900': '#1e1517',
        },
        'red-cool-vivid': {
            '100': '#f8dfe2',
            '200': '#f8b9c5',
            '300': '#fd8ba0',
            '400': '#f45d79',
            '500': '#e41d3d',
            '600': '#b21d38',
            '700': '#822133',
        },
        'red-vivid': {
            '100': '#fde0db',
            '200': '#fdb8ae',
            '300': '#ff8d7b',
            '400': '#fb5a47',
            '500': '#e52207',
            '600': '#b51d09',
            '700': '#8b1303',
            '800': '#5c1111',
        },
        'orange': {
            '050': '#f6efe9',
            '100': '#f2e4d4',
            '200': '#f3bf90',
            '300': '#f09860',
            '400': '#dd7533',
            '500': '#a86437',
            '600': '#775540',
            '700': '#524236',
            '800': '#332d27',
            '900': '#1b1614',
        },
        'orange-warm': {
            '050': '#faeee5',
            '100': '#fbe0d0',
            '200': '#f7bca2',
            '300': '#f3966d',
            '400': '#e17141',
            '500': '#bd5727',
            '600': '#914734',
            '700': '#633a32',
            '800': '#3d2925',
            '900': '#1c1615',
        },
        'orange-warm-vivid': {
            '200': '#fbbaa7',
            '300': '#fc906d',
            '400': '#ff580a',
            '500': '#d24302',
        },
        'orange-vivid': {
            '050': '#fef2e4',
            '100': '#fce2c5',
            '200': '#ffbc78',
            '300': '#fa9441',
            '400': '#e66f0e',
            '500': '#c05600',
        },
        'gold': {
            '050': '#f5f0e6',
            '100': '#f1e5cd',
            '200': '#dec69a',
            '300': '#c7a97b',
            '400': '#ad8b65',
            '500': '#8e704f',
            '600': '#6b5947',
            '700': '#4d4438',
            '800': '#322d26',
            '900': '#191714',
        },
        'gold-vivid': {
            '050': '#fef0c8',
            '100': '#ffe396',
            '200': '#ffbe2e',
            '300': '#e5a000',
            '400': '#c2850c',
            '500': '#936f38',
        },
        'yellow': {
            '050': '#faf3d1',
            '100': '#f5e6af',
            '200': '#e6c74c',
            '300': '#c9ab48',
            '400': '#a88f48',
            '500': '#8a7237',
            '600': '#6b5a39',
            '700': '#504332',
            '800': '#332d27',
            '900': '#1a1614',
        },
        'yellow-vivid': {
            '100': '#fee685',
            '200': '#face00',
        },
        'green': {
            '050': '#eaf4dd',
            '100': '#dfeacd',
            '200': '#b8d293',
            '300': '#9bb672',
            '400': '#7d9b4e',
            '500': '#607f35',
            '600': '#4c6424',
            '700': '#3c4a29',
            '800': '#293021',
            '900': '#161814',
        },
        'green-warm': {
            '050': '#f1f4d7',
            '100': '#e7eab7',
            '200': '#cbd17a',
            '300': '#a6b557',
            '400': '#8a984b',
            '500': '#6f7a41',
            '600': '#5a5f38',
            '700': '#45472f',
            '800': '#2d2f21',
            '900': '#171712',
        },
        'green-warm-vivid': {
            '050': '#f1f6a5',
            '100': '#e2f106',
            '200': '#c5d30a',
            '300': '#a3b72c',
            '400': '#7e9c1d',
            '500': '#6a7d00',
        },
        'green-cool': {
            '050': '#ecf3ec',
            '100': '#dbebde',
            '200': '#b4d0b9',
            '300': '#86b98e',
            '400': '#5e9f69',
            '500': '#4d8055',
            '600': '#446443',
            '700': '#37493b',
            '800': '#28312a',
            '900': '#1a1f1a',
        },
        'green-cool-vivid': {
            '050': '#e3f5e1',
            '100': '#b7f5bd',
            '200': '#70e17b',
            '300': '#21c834',
            '400': '#00a91c',
            '500': '#008817',
        },
        'green-vivid': {
            '050': '#ddf9c7',
            '100': '#c3ee90',
            '200': '#98d035',
            '300': '#7fb135',
            '400': '#719f2a',
            '500': '#538200',
        },
        'mint': {
            '050': '#dbf6ed',
            '100': '#c7efe2',
            '200': '#92d9bb',
            '300': '#5abf95',
            '400': '#34a37e',
            '500': '#1f8462',
            '600': '#286846',
            '700': '#204e34',
            '800': '#193324',
            '900': '#0d1a12',
        },
        'mint-cool': {
            '050': '#e0f7f6',
            '100': '#c4eeeb',
            '200': '#9bd4cf',
            '300': '#6fbab3',
            '400': '#4f9e99',
            '500': '#21827f',
            '600': '#376462',
            '700': '#2a4b45',
            '800': '#203131',
            '900': '#111818',
        },
        'mint-cool-vivid': {
                '050': '#d5fbf3',
                '100': '#7efbe1',
                '200': '#29e1cb',
                '300': '#1dc2ae',
                '400': '#00a398',
        },
        'mint-vivid': {
            '050': '#c9fbeb',
            '100': '#5dfdc8',
            '200': '#0ceda6',
            '300': '#04c585',
            '400': '#146947',
        },
        'cyan': {
            '050': '#e7f6f8',
            '100': '#ccecf2',
            '200': '#9ddfeb',
            '300': '#6ecbdb',
            '400': '#449dac',
            '500': '#168092',
            '600': '#2a646d',
            '700': '#2c4a4e',
            '800': '#203133',
            '900': '#111819',
        },
        'cyan-vivid': {
            '100': '#a8f2ff',
            '200': '#52daf2',
            '300': '#00bde3',
            '400': '#009ec1',
        },
        'blue': {
            '050': '#eff6fb',
            '100': '#d9e8f6',
            '200': '#aacdec',
            '300': '#73b3e7',
            '400': '#4f97d1',
            '500': '#2378c3',
            '600': '#2c608a',
            '700': '#274863',
            '800': '#1f303e',
            '900': '#11181d',
        },
        'blue-warm': {
            '050': '#ecf1f7',
            '100': '#e1e7f1',
            '200': '#bbcae4',
            '300': '#98afd2',
            '400': '#7292c7',
            '500': '#4a77b4',
            '600': '#345d96',
            '700': '#2f4668',
            '800': '#252f3e',
            '900': '#13171f',
        },
        'blue-warm-vivid': {
            '200': '#b7caf0',
            '300': '#81aefc',
            '400': '#5994f6',
            '500': '#2672de',
            '600': '#0050d8',
            '700': '#1a4480',
            '800': '#162e51',
        },
        'blue-cool': {
            '050': '#e7f2f5',
            '100': '#dae9ee',
            '200': '#adcfdc',
            '300': '#82b4c9',
            '400': '#6499af',
            '500': '#3a7d95',
            '600': '#2e6276',
            '700': '#224a58',
            '800': '#14333d',
            '900': '#0f191c',
        },
        'blue-cool-vivid': {
            '050': '#e1f3f8',
            '200': '#97d4ea',
            '300': '#59b9de',
            '400': '#28a0cb',
            '500': '#0d7ea2',
            '600': '#07648d',
            '700': '#074b69',
            '800': '#002D3F',
        },
        'blue-vivid': {
            '300': '#58b4ff',
            '400': '#2491ff',
            '500': '#0076d6',
            '600': '#005ea2',
            '700': '#0b4778',
            '800': '#112f4e',
        },
        'indigo': {
            '050': '#efeff8',
            '100': '#e5e4fa',
            '200': '#c5c5f3',
            '300': '#a5a8eb',
            '400': '#8889db',
            '500': '#676cc8',
            '600': '#4d52af',
            '700': '#3d4076',
            '800': '#2b2c40',
            '900': '#16171f',
        },
        'indigo-warm': {
            '050': '#f1eff7',
            '100': '#e7e3fa',
            '200': '#cbc4f2',
            '300': '#afa5e8',
            '400': '#9287d8',
            '500': '#7665d1',
            '600': '#5e519e',
            '700': '#453c7b',
            '800': '#2e2c40',
            '900': '#18161d',
        },
        'indigo-warm-vivid': {
            '300': '#b69fff',
            '400': '#967efb',
            '500': '#745fe9',
            '600': '#5942d2',
        },
        'indigo-cool': {
            '050': '#eef0f9',
            '100': '#e1e6f9',
            '200': '#bbc8f5',
            '300': '#96abee',
            '400': '#6b8ee8',
            '500': '#496fd8',
            '600': '#3f57a6',
            '700': '#374274',
            '800': '#292d42',
            '900': '#151622',
        },
        'indigo-cool-vivid': {
            '400': '#628ef4',
            '600': '#4150f2',
        },
        'indigo-vivid': {
            '200': '#c4c6f2',
            '300': '#a5a8e8',
            '500': '#656bd7',
            '600': '#4d52b0',
        },
        'violet': {
            '050': '#f4f1f9',
            '100': '#ebe3f9',
            '200': '#d0c3e9',
            '300': '#b8a2e3',
            '400': '#9d84d2',
            '500': '#8168b3',
            '600': '#665190',
            '700': '#4c3d69',
            '800': '#312b3f',
            '900': '#18161d',
        },
        'violet-warm': {
            '050': '#f8f0f9',
            '100': '#f6dff8',
            '200': '#e2bee4',
            '300': '#d29ad8',
            '400': '#bf77c8',
            '500': '#b04abd',
            '600': '#864381',
            '700': '#5c395a',
            '800': '#382936',
            '900': '#1b151b',
        },
        'violet-warm-vivid': {
            '050': '#fbebfd',
            '100': '#fbdcff',
            '200': '#f4b2ff',
            '300': '#ee83ff',
            '400': '#d85bef',
            '500': '#be32d0',
        },
        'violet-vivid': {
            '100': '#ede3ff',
            '200': '#d5bfff',
            '300': '#c39deb',
            '400': '#ad79e9',
            '500': '#9355dc',
            '600': '#783cb9',
            '700': '#562b97',
        },
        'magenta': {
            '050': '#f9f0f2',
            '100': '#f6e1e8',
            '200': '#f0bbcc',
            '300': '#e895b3',
            '400': '#e0699f',
            '500': '#c84281',
            '600': '#8b4566',
            '700': '#66364b',
            '800': '#402731',
            '900': '#1b1617',
        },
        'magenta-vivid': {
            '100': '#ffddea',
            '200': '#ffb4cf',
            '300': '#ff87b2',
            '400': '#fd4496',
            '500': '#d72d79',
            '600': '#ab2165',
        },
        'gray': {
            '010': '#fcfcfc',
            '020': '#f9f9f9',
            '030': '#f6f6f6',
            '040': '#f3f3f3',
            '050': '#f0f0f0',
            '100': '#e6e6e6',
            '200': '#c9c9c9',
            '300': '#adadad',
            '400': '#919191',
            '500': '#757575',
            '600': '#5c5c5c',
            '700': '#454545',
            '800': '#2e2e2e',
            '900': '#1b1b1b',
        },
        'gray-warm': {
            '010': '#fcfcfb',
            '020': '#f9f9f7',
            '030': '#f6f6f2',
            '040': '#f5f5f0',
            '050': '#f0f0ec',
            '100': '#e6e6e2',
            '200': '#cac9c0',
            '300': '#afaea2',
            '400': '#929285',
            '500': '#76766a',
            '600': '#5d5d52',
            '700': '#454540',
            '800': '#2e2e2a',
            '900': '#171716',
        },
        'gray-cool': {
            '010': '#fbfcfd',
            '020': '#f7f9fa',
            '030': '#f5f6f7',
            '040': '#f1f3f6',
            '050': '#edeff0',
            '100': '#dcdee0',
            '200': '#c6cace',
            '300': '#a9aeb1',
            '400': '#8d9297',
            '500': '#71767a',
            '600': '#565c65',
            '700': '#3d4551',
            '800': '#2d2e2f',
            '900': '#1c1d1f',
        },
      }
    },
    screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
  },
  plugins: []
}
export default config
