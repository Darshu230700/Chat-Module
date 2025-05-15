import { useContext, useMemo } from 'react';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import SvgColor from 'src/components/svg-color';
import { AuthContext } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const { user } = useContext(AuthContext);

  if (user?.IsSuperAdmin) {
    const data = useMemo(
      () => [
        {
          // subheader: t('overview'),
          items: [
            {
              title: t('dashboard'),
              path: paths.dashboard.root,
              icon: ICONS.dashboard,
            },
          ],
        },
        {
          // subheader: t('management'),
          items: [
            {
              title: t('admin'),
              path: paths.admin.root,
              icon: ICONS.mail,
            },
          ],
        },
      ],
      [t]
    );

    return data;
  } else if (user?.IsAdmin) {
    const data = useMemo(
      () => [
        {
          // subheader: t('overview'),
          items: [
            {
              title: t('dashboard'),
              path: paths.dashboard.root,
              icon: ICONS.dashboard,
            },
          ],
        },
        {
          // subheader: t('management'),
          items: [
            {
              title: t('Employee'),
              path: paths.user.root,
              icon: ICONS.user,
            },
            {
              title: t('Chatbot'),
              path: paths.chatbot.root,
              icon: ICONS.tour,
            },
            {
              title: t('chat list'),
              path: paths.dashboard.chat,
              icon: ICONS.chat,
            },
          ],
        },
      ],
      [t]
    );

    return data;
  } else {
    const data = useMemo(
      () => [
        {
          // subheader: t('overview'),
          items: [
            {
              title: t('dashboard'),
              path: paths.dashboard.root,
              icon: ICONS.dashboard,
            },
          ],
        },
        {
          // subheader: t('management'),
          items: [
            {
              title: t('chat'),
              path: paths.dashboard.chat,
              icon: ICONS.chat,
            },
          ],
        },
      ],
      [t]
    );

    return data;
  }

}
