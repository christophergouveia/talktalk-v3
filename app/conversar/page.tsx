/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { SetStateAction, useEffect, useState, useCallback } from 'react';
import Avatar from 'react-avatar';
import { Button, Input } from '@nextui-org/react';
import ColorPicker from '../components/ui/colorPicker';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CreateRoomModal } from '../components/modalConsetiment';
import { FaUserCircle } from 'react-icons/fa';
import { ErrorInputs } from '../interfaces/input';
import { SignJWT } from 'jose';
import { useCookies } from 'react-cookie';
import createRoom from '../utils/roomManagement/createRoom';
import updateRoom from '../utils/roomManagement/updateRoom';

const InputsSchema = yup.object().shape({
  apelido: yup
    .string()
    .required('Insira um apelido válido.')
    .min(4, 'É necessário que o apelido contenha no mínimo 4 caracteres.')
    .max(32, 'É necessário que o apelido contenha no máximo 32 caracteres.'),
});

export default function ConversarHome() {
  const [apelido, setApelido] = useState('');
  const [color, setColor] = useState('#0dffff');
  const [errorInputs, setErrorInputs] = useState<ErrorInputs>({} as ErrorInputs);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(['talktalk_roomid']);
  const router = useRouter();

  const handleColorChange = useCallback((newColor: SetStateAction<string>) => {
    setColor(newColor);
  }, []);

  const handleCriarSala = useCallback(async () => {
    let apelidoValidado = await validarApelido();
    if (!apelidoValidado) {
      return null;
    }
    setLoading(true);
    try {
      const sala = await createRoom();
      if (sala != null) {
        const payload = {
          apelido: apelido,
          cor: color,
          sala: sala,
        };
        const secretBase64 = process.env.NEXT_PUBLIC_JWT_SECRET;
        if (secretBase64 && !cookies.talktalk_roomid) {
          const decodedSecret = Buffer.from(secretBase64, 'base64');
          const secretUint8Array = new Uint8Array(decodedSecret);
          const token = await new SignJWT(payload)
            .setExpirationTime('1d')
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secretUint8Array);
          setCookie('talktalk_roomid', token, {
            expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
            sameSite: 'strict',
            path: '/',
          });
        }

        await updateRoom(sala, { host: cookies.talktalk_roomid });
        router.push(`/conversar/${sala}`);
      } else {
        toast('Ocorreu um erro ao criar a sala.', {
          type: 'error',
        });
      }
    } catch (error) {
      toast('Ocorreu um erro ao criar a sala.', {
        type: 'error',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [apelido]);

  const validarApelido = useCallback(async () => {
    try {
      await InputsSchema.pick(['apelido']).validate({
        apelido: apelido,
      });
      setErrorInputs((prevState) => ({
        ...prevState,
        errorApelido: false,
        errorApelidoMessage: '',
      }));
      return true;
    } catch (error) {
      setErrorInputs((prevState) => ({
        ...prevState,
        errorApelido: true,
        errorApelidoMessage: (error as Error).message,
      }));
      return false;
    }
  }, [apelido, handleCriarSala]);

  useEffect(() => {
    if (errorInputs.errorApelido) {
      validarApelido();
    }
  }, [apelido, errorInputs.errorApelido, validarApelido]);

  return (
    <>
      <div className="mt-12">
        <div className="mx-auto w-full text-center text-xl font-bold lg:w-[60%] lg:text-3xl">
          <h1 className="!mb-4">
            Uma{' '}
            <span className="bg-gradient-to-r from-[#38A3F5] to-[#786FF2] bg-clip-text font-extrabold text-transparent">
              poderosa
            </span>{' '}
            ferramenta de tradução em tempo real. Sem necessidade de trocar de abas.
          </h1>
        </div>
        <section className="m-auto w-[calc(100%-2rem)] rounded-lg p-4 py-12 shadow-lg dark:bg-[#212121] dark:shadow-none lg:w-1/2">
          <h1 className="m-2 text-center text-2xl font-bold">Crie uma sala</h1>
          <p className="m-2 text-center text-gray-600 dark:text-white">
            Deseja entrar em uma sala já existente? Copie o link que o anfitrião da sala lhe enviou e acesse-o.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            {apelido.trim().length == 0 ? (
              <FaUserCircle className="text-9xl text-gray-400" />
            ) : (
              <div className="flex flex-col items-center gap-3 lg:flex-row">
                <Avatar
                  className="[text-shadow:_0_1px_1px_rgb(0_0_0_/_100%)]"
                  name={apelido}
                  maxInitials={2}
                  color={color}
                  round
                />
                <ColorPicker onColorChange={handleColorChange} />
              </div>
            )}
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleCriarSala();
              }}
            >
              <Input
                type="name"
                size="lg"
                label="Apelido"
                placeholder="Escolha um apelido"
                maxLength={32}
                value={apelido}
                onValueChange={setApelido}
                isInvalid={errorInputs.errorApelido}
              />
              {errorInputs.errorApelido && <span className="text-danger">* {errorInputs.errorApelidoMessage}</span>}
            </form>
            <Button
              color="primary"
              className="bg-[#38A3F5] font-semibold"
              onClick={handleCriarSala}
              isLoading={isLoading}
            >
              CRIAR UMA SALA
            </Button>
          </div>
        </section>
      </div>
      <CreateRoomModal aberto={isLoading} />
    </>
  );
}
