# Sobes

```bash
npm install
npm run dev
npm run check
```

## Почему так устроено

- Потенциально переиспользуемые компоненты оставлены page-local намеренно. В FSD 2.1 действует подход `pages first`: возможность повторного использования сама по себе не является причиной создавать новый слой или slice — код выносится ниже, когда появляется реальное переиспользование между страницами. Общие инфраструктурные компоненты (`Button`, `Input`, `Page`) уже находятся в `shared/ui` ([migration 2.1](https://fsd.how/docs/guides/migration/from-v2-0/), [layers](https://fsd.how/docs/reference/layers/)).
- Поэтому `features`, `entities` и `widgets` пока не нужны; преждевременное выделение сущностей увеличивает связанность ([excessive entities](https://fsd.how/docs/guides/issues/excessive-entities/)).
- Global CSS содержит только reset и tokens; CSS Modules лежат рядом с владельцем, а переиспользуемый visual contract — в `shared/ui` ([desegmentation](https://fsd.how/docs/guides/issues/desegmented/)).
- Page-specific запросы и query factories находятся в `pages/*/api`, а общий HTTP client — в `shared/api` ([API requests](https://fsd.how/docs/guides/examples/api-requests/), [TanStack Query](https://fsd.how/docs/guides/tech/with-react-query/)).
- Каждая page-slice экспортируется через `index.ts`, внутренние файлы снаружи не импортируются ([public API](https://fsd.how/docs/reference/public-api/)).
- Hono/Node backend вынесен из frontend-слоёв: FSD описывает архитектуру клиентского приложения ([overview](https://fsd.how/docs/get-started/overview/)).
