import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import Share from 'react-native-share';

export default function App(){
  const [msgHead, setMsgHead] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [msgList, setMsgList] = useState('');
  const [message, setMensage] = useState('');
  const [de, setDe] = useState(0);
  const [ate, setAte] = useState(0);
  const [linhaLista, setLinhaLista] = useState('');
  const lista = { de:de, ate:ate }
  const listaArray = []

  function getList() {
    for (let linha = (de - 1); linha <= ate; linha++) {
      listaArray.push(String(linha + ' - \n'));
    }
      const listaString = listaArray.join('');
      setLinhaLista(listaString)
  }

  useEffect(() => {
      getList()
  })
  
  const shareOnWhatsApp = () => {
    // setMensage(msgHead + '\n' + msgBody + '\n' + msgList)
    // setMensage(linhaLista)
    setMensage(msgHead + '\n\n' + linhaLista + '\n\n' + msgList)

    const shareOptions = {
      title: 'Compartilhar via',
      message: message,
      social: Share.Social.WHATSAPP,
      url: '', // Pode ser uma URL se você quiser compartilhar um link
      type: 'text/plain',
    };
  
    Share.shareSingle(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <View style={{gap:4}}>
        <TextInput onChangeText={(text) => setDe(text)} value={String(de)} placeholder='De'/>
        <TextInput onChangeText={(text) => setAte(text)} value={String(ate)} placeholder='Até'/>
      </View>
      <TextInput onChangeText={(text) => setMsgHead(text)} value={msgHead} placeholder='Qual será o titulo?' maxLength={25}/>
      <TextInput onChangeText={(text) => setMsgList(text)} value={msgList} placeholder='Qual será o final?'/>
      <Button title='Share' onPress={() => shareOnWhatsApp()}/>
    </View>
  )
}

