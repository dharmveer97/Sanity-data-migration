const allBrands = [
  {
    id: '05ec16bb-c716-4838-a389-00e995ddc744',
    title: 'Kobo',
  },
  {
    id: '1005e127-23a6-4694-b133-aeb4b44be0cb',
    title: 'Nintendo',
  },
  {
    id: '118272c8-7cb0-4572-bec6-ecbb64e2840f',
    title: 'Microsoft',
  },
  {
    id: '1236c864-8460-4126-be12-278a7414f74a',
    title: 'Toshiba',
  },
  {
    id: '1410e8b3-11a9-403d-b3fc-0ed4707ec6d6',
    title: 'Epson',
  },
  {
    id: '16d69267-ee26-4188-b756-559863615927',
    title: 'IHOME',
  },
  {
    id: '1abfcf8e-4836-4741-8892-4c4ef0923638',
    title: 'SHARP',
  },
  {
    id: '1c73bcd1-baff-4b57-b910-c331d510e622',
    title: 'Danby',
  },
  {
    id: '1ea52745-d258-497a-b3d9-3c7ff54f099f',
    title: 'Amana',
  },
  {
    id: '206e80d4-6d53-471e-8768-eca5f3460f88',
    title: 'INGLIS',
  },
  {
    id: '20928a82-8880-48a2-8e3f-16eb8ae3d785',
    title: 'Google',
  },
  {
    id: '22964be5-0027-45b3-bba6-f27867f4f002',
    title: 'Canon',
  },
  {
    id: '2bd04e2a-46d0-4624-b619-b10a980ac06c',
    title: 'Galanz',
  },
  {
    id: '2cdd5045-b542-4205-a5f7-a89deef89d91',
    title: 'SONY',
  },
  {
    id: '305747f0-1b7d-47c3-b6c9-fbb0fcf55920',
    title: 'Philips',
  },
  {
    id: '33f20246-a961-414b-a5c4-0e9f3ecbad92',
    title: 'Whirlpool',
  },
  {
    id: '35717c7b-7160-43b9-a83e-d856a02c0a98',
    title: 'Insignia',
  },
  {
    id: '366a1b5d-8b52-4871-afe3-3e808ca561ae',
    title: 'Bosch',
  },
  {
    id: '37d409a9-8e38-4397-ac3f-ef042b77643d',
    title: 'Nutone',
  },
  {
    id: '421f169c-8209-4ffa-a95e-e6bf7773e3e0',
    title: 'PYLE',
  },
  {
    id: '4307b576-8452-40e5-ae63-4c825c0bf987',
    title: 'Monster',
  },
  {
    id: '46b59274-33eb-4192-bcd2-fb6a877348de',
    title: 'JVC',
  },
  {
    id: '46ce251b-86d1-4418-b8d0-fa8992d7b96c',
    title: 'SAMSUNG',
  },
  {
    id: '529c9f22-430f-4e2c-8c8d-ce22f6b46f67',
    title: 'Smwdwedartab',
  },
  {
    id: '538c14e7-14f6-47d8-9d9c-d721b30461e3',
    title: 'TCL',
  },
  {
    id: '662ae69f-db0d-4d14-af4a-c71cf14dc0d0',
    title: 'ACER',
  },
  {
    id: '68b4729f-f3f7-4cdd-ab08-34e555cf64e5',
    title: 'wfweqwedw',
  },
  {
    id: '6995e532-f968-4039-b14a-3ab481eb4156',
    title: 'Rock Band',
  },
  {
    id: '6ad73400-2c1e-4865-aab8-f8207e0f3838',
    title: 'Beats',
  },
  {
    id: '6c0fd7a2-cc87-4b03-9375-6687996a852f',
    title: 'MSI',
  },
  {
    id: '6cf63db6-efd2-415a-b357-ac5d1fae2fa5',
    title: 'VIEWSONIC',
  },
  {
    id: '81f192e0-345e-40f8-91f8-f7bd21577047',
    title: 'HP',
  },
  {
    id: '9260d899-962a-455e-ac23-5869eee34526',
    title: 'VIZIO',
  },
  {
    id: 'a1551f51-ac22-44bc-8b2f-c23983a32620',
    title: 'Sylvania',
  },
  {
    id: 'a19f8692-0220-4131-82ce-529382889451',
    title: 'Costway',
  },
  {
    id: 'a1b71e98-ab94-444c-82c0-52e09e6d82d8',
    title: 'Lexmark',
  },
  {
    id: 'a905c04e-8fcd-424a-baac-f9a144d5eb9d',
    title: 'ASUS',
  },
  {
    id: 'ad9a6a56-17a5-4bba-a31a-e644a58dfbdf',
    title: 'Hisense',
  },
  {
    id: 'af710394-84db-4dff-b436-cd453f57d76b',
    title: 'PROSCAN',
  },
  {
    id: 'ba57583f-7f0b-48df-b9fc-ce4b1a71e5ac',
    title: 'LENOVO',
  },
  {
    id: 'baee68ec-9ff9-4e87-b3e9-9621303f08f1',
    title: 'Maytag',
  },
  {
    id: 'bf35cc54-8378-4f56-9938-3a705dfca66e',
    title: 'Midea',
  },
  {
    id: 'c2455768-79f1-43fe-8d12-63cb438be441',
    title: 'HoneyComb',
  },
  {
    id: 'c5c78b23-95e1-4e89-b96e-88d8a4729832',
    title: 'Electrolux',
  },
  {
    id: 'cbbc656f-44d8-4c7e-b012-b33262ee4e5a',
    title: 'Apple',
  },
  {
    id: 'cbc0839d-59bf-4525-94ab-b43c52ff1dba',
    title: 'RCA',
  },
  {
    id: 'cd722d0a-2f28-40d1-a74c-cc9afbef2713',
    title: 'LG',
  },
  {
    id: 'cfbcbf16-4c05-41fb-aa7b-8c1dc4e9fa80',
    title: 'ONN',
  },
  {
    id: 'd2c91893-6fb0-49ba-9b66-968ce9f6d7a2',
    title: 'Dacor',
  },
  {
    id: 'd3f6676b-b790-4a8e-aa10-156f4bee0f2c',
    title: 'Motorola',
  },
];

export default allBrands;
