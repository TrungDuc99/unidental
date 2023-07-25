import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  Cards,
  Logout,
  Notification,
  NotificationBing,
  Profile,
} from 'iconsax-react-native';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import type { ColorSchemeType } from '@/core';
import { useAuth } from '@/core';
import { translate, useSelectedTheme } from '@/core';
import type { Option } from '@/ui';
import { Options, View } from '@/ui';
import { CardBase } from '@/ui/core/card-base';
import colors from '@/ui/theme/colors';

import { Item } from './item';
import { SwitchItem } from './item-switch';
import { ItemsContainer } from './items-container';
import { LanguageItem } from './language-item';
import { ThemeItem } from './theme-item';

const Settings = () => {
  const signOut = useAuth.use.signOut();

  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const optionsRef = React.useRef<BottomSheetModal>(null);
  const open = React.useCallback(() => optionsRef.current?.present(), []);
  const onSelect = React.useCallback(
    (option: Option) => {
      setSelectedTheme(option.value as ColorSchemeType);
      optionsRef.current?.dismiss();
    },
    [setSelectedTheme]
  );

  const themes = React.useMemo(
    () => [
      { label: `${translate('settings.theme.dark')} 🌙`, value: 'dark' },
      { label: `${translate('settings.theme.light')} 🌞`, value: 'light' },
      { label: `${translate('settings.theme.system')} ⚙️`, value: 'system' },
    ],
    []
  );

  const theme = React.useMemo(
    () => themes.find((t) => t.value === selectedTheme),
    [selectedTheme, themes]
  );

  return (
    <View style={styles.container}>
      <CardBase className="p-4 py-2 ">
        <ItemsContainer title="settings.my_account">
          <Item
            icon={<Profile size={20} color={colors.primary[200]} />}
            text="settings.manage_profile"
          />
          <Item
            icon={<Cards size={20} color={colors.primary[200]} />}
            text="settings.payment_method"
          />
        </ItemsContainer>
        <ItemsContainer title="settings.notification">
          <SwitchItem lable={'settings.notification'} icon={Notification} />
          <SwitchItem
            lable={'settings.Promothinal_notification'}
            icon={NotificationBing}
          />
        </ItemsContainer>
        <ItemsContainer title="settings.generale">
          <LanguageItem />
          <ThemeItem />
        </ItemsContainer>
        <ItemsContainer title="settings.more">
          <Item
            icon={<Logout size={20} color={colors.primary[200]} />}
            text="settings.logout"
            onPress={signOut}
          />
        </ItemsContainer>
      </CardBase>
      <Options
        ref={optionsRef}
        options={themes}
        onSelect={onSelect}
        value={theme?.value}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {},
  settingContainer: {},
  title: {},
  settingItem: {
    display: 'flex',

    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
