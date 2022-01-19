import React, { useState, useEffect, forwardRef } from 'react';
import type { MutableRefObject } from 'react';

import { Text, TextInput, View, ViewStyle, useColorScheme } from 'react-native';

import type { TextInputProps } from 'react-native';
import { Controller as FormController, useForm } from 'react-hook-form';

import type {
  Control,
  FieldValues,
  RegisterOptions,
  // TFieldValues,
  FieldPath,
} from 'react-hook-form';

import appBaseTheme from '../themes/base';
import appLightTheme from '../themes/light';
import appDarkTheme from '../themes/dark';
import { mergeStyleSheetMany, Center } from '../primitives';

let lightTheme = mergeStyleSheetMany(appBaseTheme, appLightTheme);
let darkTheme = mergeStyleSheetMany(appBaseTheme, appDarkTheme);

type InputProps = {
  blurOnInvalid?: boolean;
  ref?: (r: MutableRefObject<TextInput>) => void;
  // getRef?: (r: any) => void;
  name: string;
  inputValue?: string;
  // formName: string;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control: Control<FieldValues, object>;
  titleStyle: ViewStyle | ViewStyle[];
  style: ViewStyle | ViewStyle[];
  titleText: string;
  inputStyle: ViewStyle | ViewStyle[];
  inputPlaceholder?: string;
  errors: FormError;
  inputErrorMsg: ViewStyle | ViewStyle[];
  inputFocusError: ViewStyle | ViewStyle[];
  secureTextEntry?: boolean;
  onChange?: (text: string, error: FormError) => void;
};

type FormProps = TextInputProps & InputProps;

let InputField = forwardRef(
  (props: FormProps, ref: React.ForwardedRef<TextInput>) => {
    let {
      errors,
      titleStyle,
      titleText,
      name,
      inputFocusError,
      inputPlaceholder,
      control,
      inputStyle,
      inputErrorMsg,
      secureTextEntry,
      blurOnInvalid,
    } = props;

    let hasError = !!errors[name];

    let [focusColor, setFocusColor] = useState(hasError ? inputFocusError : {});

    useEffect(() => {
      let hasError2 = !!errors[name];
      if (hasError2) {
        setFocusColor(inputFocusError);
      } else {
        setFocusColor({});
      }
    }, [errors, inputFocusError, name]);

    // console.log(errors[name]);
    return (
      <TextInput
        {...props}
        ref={ref}
        autoCapitalize="none"
        secureTextEntry={props.secureTextEntry || false}
        style={[props.style, focusColor]}
        keyboardType="default"
        textContentType="oneTimeCode"
        onChange={e => {
          setTimeout(() => {
            let hasError2 = !!errors[name];
            setFocusColor(hasError2 ? inputFocusError : {});
            // console.log(name, );
          }, 100);
          // errors = { ...errors };
          // console.log(e);
        }}
        onFocus={a => {
          let hasError2 = !!errors[name];
          setFocusColor(hasError2 ? inputFocusError : {});
          // }
        }}
        onBlur={a => {
          let hasErrors2 = Object.keys(props.errors).length > 0;

          if (props?.inputValue != null && props?.onBlur) {
            if (hasErrors2 && props.blurOnInvalid === false) {
              // console.log('1');
              // props?.onFocus(a);
              // props?.onBlur(a);
              // setFocusColor({});
              return;
            }

            // if (!hasErrors) {
            // console.log('2');
            props?.onBlur(a);
            hasErrors2 = !!errors[name];
            setFocusColor(hasErrors2 ? inputFocusError : {});
            // }
          }
        }}
      />
    );
  }
);

type FormError = Record<string, void | Record<'message' | 'type', string>>;

export default forwardRef(function Input(
  props: Omit<FormProps, 'style'>,
  ref: React.ForwardedRef<TextInput>
): JSX.Element {
  // let OSTheme = useColorScheme();

  let {
    errors,
    titleStyle,
    titleText,
    name,
    inputPlaceholder,
    control,
    inputStyle,
    inputErrorMsg,
    secureTextEntry,
    blurOnInvalid,
  } = props;

  blurOnInvalid = blurOnInvalid == null ? true : blurOnInvalid;

  let onChangeHandler = (reactHookFormOnChange: (text: string) => void) => {
    return (text: string) => {
      if (props.onChange) {
        props.onChange(text, errors);
      }

      if (reactHookFormOnChange) {
        reactHookFormOnChange(text);
      }
    };
  };

  return (
    <>
      <Text style={titleStyle}>{titleText}</Text>
      <FormController
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <InputField
              {...props}
              blurOnInvalid={blurOnInvalid}
              ref={ref}
              secureTextEntry={secureTextEntry}
              style={inputStyle}
              inputValue={value}
              placeholder={inputPlaceholder || ''}
              onBlur={onBlur}
              onChangeText={onChangeHandler(onChange)}
            />
          );
        }}
      />
      {(errors[name]?.message && (
        <Text style={inputErrorMsg}>{errors[name]?.message}</Text>
      )) || <View style={inputErrorMsg} />}
    </>
  );
});
