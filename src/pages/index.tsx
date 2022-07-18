import {
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
  Stack,
  useToast,
} from "@chakra-ui/react"
import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react"
import { api } from "../config/axios"
import { formatDate } from "../utils/format-date"

interface InputBoxProps extends InputProps {
  label: string
  text?: string
  name: string
}

function InputBox({ label, text, name, isDisabled, ...rest }: InputBoxProps) {
  return (
    <FormControl display={isDisabled && "none"}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} name={name} isRequired={!isDisabled} {...rest} />
      {text && <FormHelperText>{text}</FormHelperText>}
    </FormControl>
  )
}

const dados = {
  nome: "",
  horas: "00:00",
  entrevistas: 0,
  abducoes: 0,
  pontos: 0,
  referidos: 0,
  print: false,
}

export default function () {
  const toast = useToast()
  const [_, setBoolean] = useState(true)
  function update() {
    setBoolean((value) => !value)
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const print = dados.referidos && dados.print ? "ENVIADO" : ""
    const date = new Date()
    if (date.getHours() < 12) {
      date.setDate(date.getDate() - 1)
    }
    const data = formatDate(date)
    api.post("/agents", { ...dados, print, data })
    toast({
      title: "Planilha preenchida",
      status: "success",
      position: "top-right",
    })
  }
  function handleChange(e: ChangeEvent<HTMLDivElement>) {
    const input = e.target as HTMLInputElement
    dados[input.name] = input.value || input.checked
  }
  useEffect(() => {
    dados.nome = localStorage.getItem("nome")
    if (dados.nome) update()
  }, [])
  return (
    <Center
      display={["block", "flex"]}
      width="100vw"
      minHeight="100vh"
      bg="#282828"
    >
      <Stack
        maxWidth="30rem"
        as="form"
        spacing="1rem"
        padding="2.25rem 1rem"
        onSubmit={handleSubmit}
        onChange={handleChange}
        onBlur={update}
      >
        <InputBox
          defaultValue={dados.nome}
          label="Nome e sobrenome"
          name="nome"
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            localStorage.setItem("nome", e.target.value)
          }}
        />
        <InputBox
          label="Horas trabalhadas"
          name="horas"
          type="time"
          text="Quantas horas você realmente trabalhou, sem contar as pausas?"
        />
        <InputBox
          type="number"
          label="Entrevistas Completas"
          name="entrevistas"
          text="Quantas entrevistas você chegou até o fechamento?"
          min={0}
          max={99}
        />
        <InputBox
          isDisabled={dados.entrevistas == 0}
          type="number"
          label="Abduções"
          name="abducoes"
          text="Quantas matrículas você fez?"
          min={0}
          max={99}
        />
        <InputBox
          isDisabled={dados.entrevistas == 0 || dados.abducoes == 0}
          type="number"
          label="Pontos"
          name="pontos"
          text="Quantos pontos você marcou?"
          step={0.5}
          min={1}
          max={99}
        />
        <InputBox
          type="number"
          label="Referidos"
          name="referidos"
          text="Quantos contatos você pegou?"
          min={0}
          max={999}
        />
        <Flex flexDir="column">
          <Checkbox
            marginTop="1rem"
            name="print"
            display={dados.referidos == 0 ? "none" : "flex"}
          >
            Enviei o print dos referidos no telegram
          </Checkbox>
          <Button type="submit" textTransform="uppercase" marginTop="2rem">
            Enviar
          </Button>
        </Flex>
      </Stack>
    </Center>
  )
}
