export const createGoofyName = () => {
  return pickRandomElement(prefix) + createFirstName() + ' ' + createLastName();
};

const pickRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const createName = (lengths) => {
  let name = pickRandomElement(starts);
  const numberOfChuncks = pickRandomElement(lengths);
  for (let i = 0; i < numberOfChuncks; i++) {
    const addition = i % 2 ? pickRandomElement(connectescants) : pickRandomElement(vowelees);
    name += addition;
  }
  return name;
};

const createFirstName = () => createName([1, 2, 2, 2, 3, 4, 5]);

const createLastName = () => {
  return pickRandomElement(lastNamePrefix) + createName([1, 2, 3, 4, 5]) + pickRandomElement(lastNameEnders);
};

const prefix = ['', 'Dr. ', 'Prof. ', 'Big ', "Lil' ", '', '', '', ''];
const starts = [
  'Th',
  'W',
  'J',
  'Cl',
  'M',
  'L',
  'T',
  'Ch',
  'Sh',
  'St',
  'D',
  'Al',
  'Ed',
  'H',
  'P',
  'Em',
  'Esm',
  'R',
  'B',
  'Pr',
  'Bl',
  'V',
];
const vowelees = ['o', 'e', 'i', 'u', 'a', 'ai', 'ou', 'oo', 'au', 'ee'];
const connectescants = ['s', 't', 'rt', 'n', 'nt', 'm', 'll', 'p', 'n', 'nch', 'ch', 'w', 'd', 'sh', 'st', 'ss', 'ng'];
const lastNamePrefix = ['', '', '', '', '', 'Von', 'Mc'];
const lastNameEnders = ['son', 'y', 'y', 'berg', '', '', '', '', ''];
