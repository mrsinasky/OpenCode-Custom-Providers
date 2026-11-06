import { Command, Plugin, SettingsPage, Style } from "@opencode/plugin/gui"
import { definition } from "./gui/definition"
import { CustomProvidersPage } from "./gui/page"
import { styles } from "./gui/styles"

export default Plugin.define({
  ...definition,
  setup(ctx) {
    ctx.add(Style, styles)

    ctx.add(SettingsPage, {
      id: "custom-providers",
      icon: "providers",
      get title() {
        return ctx.t("title")
      },
      get entries() {
        return [
          {
            id: "custom-providers",
            title: ctx.t("title"),
            description: ctx.t("description"),
            keywords: "provider model api endpoint custom",
          },
        ]
      },
      render: () => <CustomProvidersPage />,
    })

    ctx.add(
      Command,
      (): Command => ({
        id: "manage",
        title: ctx.t("command.manage"),
        description: ctx.t("command.manage.description"),
        keywords: ctx.t("command.manage.keywords"),
        group: ctx.t("command.category"),
        run: () => ctx.layout.settings("custom-providers"),
      }),
    )
  },
})
