import { http, HttpResponse } from "msw";

const shoes = [
    { id: '1', size: '43' },
    { id: '2', size: '30' },
];

const bookingInfo = {
    when: '2023-12-25T15:30',
    lanes: "1",
    people: "2",
    "shoes": [
        "43",
        "30"
    ]
};

export const handlers = [http.post('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', async ({ request }) => {
    return HttpResponse.json({
      ...bookingInfo,
      active: true,
      id: "STR6278FGTL",
      price: 340
    });
})];