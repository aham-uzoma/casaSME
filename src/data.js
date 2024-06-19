import DiamondPlan from "./iconsComp/DiamondPlan/DiamondPlan";
import GoldPlan from "./iconsComp/GoldPlan/GoldPlan";
import StarterPlan from "./iconsComp/StarterPlan/StarterPlan";

export const pricing = {
    title: 'Choose your flexible plan.',
    cards: [
      {
        icon: <StarterPlan color='green'/>,
        title: 'Starter Plan',
        services: [
          { name: '500 Transaction Records/Month' },
          { name: '100 Invoice/month' },
          { name: '200 Stock-Items' },
        ],
        price: '$9.99',
        userAmount: 'up to 3 user + 1.99 per user',
        btnText: 'Get this',
        delay: 300,
      },
      {
        icon: <GoldPlan color='blue'/>,
        title: 'Silver Plan',
        services: [
          { name: '1000 Transaction Records/Month' },
          { name: '200 Invoice/month' },
          { name: '500 Stock-Items' },
        ],
        price: '$19.99',
        userAmount: 'up to 3 user + 1.99 per user',
        btnText: 'Get this',
        delay: 600,
      },
      {
        icon: <DiamondPlan color='red'/>,
        title: 'Diamond Plan',
        services: [
          { name: 'Unlimited Transaction Records/Month' },
          { name: 'Unlimited Invoice/month' },
          { name: 'Unlimited Stock-Items' },
        ],
        price: '$29.99',
        userAmount: 'up to 3 user + 1.99 per user',
        btnText: 'Get this',
        delay: 900,
      },
    ],
  };
